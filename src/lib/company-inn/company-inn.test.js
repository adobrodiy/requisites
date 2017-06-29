'use strict';
const assert = require( 'assert' );
const service = require( './../service/service.js' );
const companyInnFactory = require( './company-inn.js' );

const validationKeys = ['lengthVal', 'subject', 'code', 'number', 'check' ];
const checkValidation = (validation, excludeKeys) => validationKeys
    .filter( key => !excludeKeys.includes( key ) )
    .forEach( key => assert.equal( true, validation[key] ) );

describe( "Company inn service test", function () {
    const badSubject = "18";
    const badCode = "66";
    const badNumber = "12345";
    const inn = companyInnFactory( {
        subjects: service.generateStrings( 2, 10, [ badSubject ] ),
        codes: service.generateStrings( 2, 10, [ badCode ] ),
        numbers: service.generateStrings( 5, 10, [ badNumber ] )
    } );

    it( 'generates checksum correctly', function () {
        assert.equal( inn.getCheck( '111768305' ), 4 );
        assert.equal( inn.getCheck( '775673518' ), 9 );
        assert.equal( inn.getCheck( '472233556' ), 4 );
        assert.equal( inn.getCheck( '131334455' ), 5 );
        assert.equal( inn.getCheck( '876587654' ), 0 );
    } );


    let str;
    let validation;
    it( 'It generates something', function () {
        str = inn.generate();
    } );

    it( 'Generated has valid length', function () {
        assert.equal( str.length, 10 );
    } );

    it( 'It validates', function () {
        inn.validate( str );
        validation = inn.getValidation( str );
    } );

    it( 'Generated is valid', function () {
        assert.equal( true, inn.validate( str ) );
        assert.equal( true, service.checkValidation( validation ) );
    } );

    it( 'Validation could fail', function () {
        assert.equal( false, inn.validate( str + '1' ) );
    } );

    it( 'It validates by checksum', function () {
        const check = parseInt( str.slice( 9, 10 ) );
        const badStr = str.slice( 0, 9 ) + ( ( check + 1 ) % 10 );
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.check, false );
        checkValidation( badValidation, [ 'check' ]);
    } );

    it( 'It validates by length', function () {
        const badStr = str + '1';
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.lengthVal, false );
        checkValidation( badValidation, [ 'lengthVal' ]);
    } );

    it( 'It validates by subject', function () {
        const badStr = badSubject + str.slice( 2, 10 );
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.subject, false );
        checkValidation( badValidation, [ 'subject', 'code', 'check' ]);
    } );

    it( 'It validates by code', function () {
        const badStr = str.slice(0, 2) + badCode + str.slice( 4, 10 );
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.code, false );
        checkValidation( badValidation, [ 'code', 'check' ]);
    } );

    it( 'It validates by number', function () {
        const badStr = str.slice(0,4) + badNumber + str.slice(9,10);
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.number, false );
        checkValidation( badValidation, [ 'number', 'check' ] );
    } );
    // TODO Add test like ogrn

} );
