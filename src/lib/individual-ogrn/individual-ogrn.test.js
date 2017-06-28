'use strict';
const assert = require( 'assert' );
const service = require( './../service/service.js' );
const ogrnFactory = require( './individual-ogrn.js' );

const validationKeys = ['lengthVal', 'initVal', 'year', 'subject', 'number', 'check'];
const checkValidation = (validation, excludeKeys) => validationKeys
    .filter( key => !excludeKeys.includes( key ) )
    .forEach( key => assert.equal( true, validation[key] ) );

describe( "Individual ogrn service test", function () {
    const badInit = '4';
    const badYear = "17";
    const badSubject = "18";
    const badNumber = "123456789";
    const ogrn = ogrnFactory( {
        initVals: [ '3' ],
        years: service.generateStrings( 2, 10, [ badYear ] ),
        subjects: service.generateStrings( 2, 10, [ badSubject ] ),
        numbers: service.generateStrings( 9, 10, [ badNumber ] )
    } );

    let str;
    let validation;
    it( 'It generates something', function () {
        str = ogrn.generate();
    } );
    it( 'Generated has valid length', function () {
        assert.equal( str.length, 15 );
    } );

    it( 'It validates', function () {
        ogrn.validate( str );
        validation = ogrn.getValidation( str );
    } );
    it( 'Generated is valid', function () {
        assert.equal( true, ogrn.validate( str ) );
        assert.equal( true, service.checkValidation( validation ) );
    } );
    it( 'Validation could fail', function () {
        assert.equal( false, ogrn.validate( str + '1' ) );
    } );
    it( 'It validates by checksum', function () {
        const check = parseInt( str.slice( 14, 15 ) );
        const badStr = str.slice( 0, 14 ) + ( ( check + 1 ) % 10 );
        const badValidation = ogrn.getValidation( badStr );
        assert.equal( false, ogrn.validate( badStr ) );
        assert.equal( badValidation.check, false );
        checkValidation( badValidation, [ 'check' ]);
    } );
    it( 'It validates by length', function () {
        const badStr = str + '1';
        const badValidation = ogrn.getValidation( badStr );
        assert.equal( false, ogrn.validate( badStr ) );
        assert.equal( badValidation.lengthVal, false );
        checkValidation( badValidation, [ 'lengthVal' ]);
    } );
    it( 'It validates by initVal', function () {
        const badStr = badInit + str.slice( 1, 15 );
        const badValidation = ogrn.getValidation( badStr );
        assert.equal( false, ogrn.validate( badStr ) );
        assert.equal( badValidation.initVal, false );
        checkValidation( badValidation, [ 'initVal', 'check' ] );
    } );
    it( 'It validates by year', function () {
        const badStr = str.slice(0,1) + badYear + str.slice( 3, 15 );
        const badValidation = ogrn.getValidation( badStr );
        assert.equal( false, ogrn.validate( badStr ) );
        assert.equal( badValidation.year, false );
        checkValidation( badValidation, [ 'year', 'check' ] );
    } );

    it( 'It validates by subject', function () {
        const badStr = str.slice(0,3) + badSubject + str.slice( 5, 15 );
        const badValidation = ogrn.getValidation( badStr );
        assert.equal( false, ogrn.validate( badStr ) );
        assert.equal( badValidation.subject, false );
        checkValidation( badValidation, [ 'subject', 'check' ]);
    } );

    it( 'It validates by number', function () {
        const badStr = str.slice(0,5) + badNumber + str.slice( 13, 14 );
        const badValidation = ogrn.getValidation( badStr );
        assert.equal( false, ogrn.validate( badStr ) );
        assert.equal( badValidation.number, false );
        checkValidation( badValidation, [ 'number', 'check' ] );
    } );

    // TODO Add test like ogrn

} );
