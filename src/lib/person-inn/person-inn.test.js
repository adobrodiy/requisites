'use strict';
const assert = require( 'assert' );
const service = require( './../service/service.js' );
const innFactory = require( './person-inn.js' );

function getCodes ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 90 ) + 10;
    } ).map( function ( item ) { return item.toString(); } );
    return result;
}

function getNumbers ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 899999 ) + 100000;
    } ).map( function ( item ) { return item.toString(); } );
    return result;
}

describe( "Inn service test", function () {
    const inn = innFactory( {
        subjects: require( './../subjects.json' ),
        codes: getCodes( 1 ),
        numbers: getNumbers( 1 )
    } );

    let str;
    let validation;
    it( 'It generates something', function () {
        str = inn.generate();
    } );
    it( 'Generated has valid length', function () {
        assert.equal( str.length, 12 );
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

    it( 'first checksum validation could fail', function () {
        const firstCheck = parseInt( str.slice( 10, 11 ) );
        const badStr = str.slice( 0, 10 ) + ( ( firstCheck + 1 ) % 10 ) + str.slice( 11, 12 );
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.firstCheck, false );
    } );
    it( 'second checksum validation could fail', function () {
        const secondCheck = parseInt( str.slice( 11, 12 ) );
        const badStr = str.slice( 0, 11 ) + ( ( secondCheck + 1 ) % 10 );
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.secondCheck, false );
    } );
    it( 'validates by length', function () {
        const badStr = str + '1';
        const badValidation = inn.getValidation( badStr );
        assert.equal( false, inn.validate( badStr ) );
        assert.equal( badValidation.lengthVal, false );
    } );

    // TODO Add test like ogrn

} );
