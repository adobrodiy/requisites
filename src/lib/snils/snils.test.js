'use strict';
const assert = require( 'assert' );
const service = require( './../service/service.js' );
const snilsFactory = require( './snils.js' );

function getNumbers ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 899999999 ) + 100000000;
    } ).map( function ( item ) { return item.toString(); } );
    return result;
}

describe( "Snils service test", function () {
    const snils = snilsFactory( {
        numbers: getNumbers( 1 )
    } );

    let str;
    let validation;
    it( 'It generates something', function () {
        str = snils.generate();
    } );
    it( 'Generated has valid length', function () {
        assert.equal( str.length, 11 );
    } );

    it( 'It validates', function () {
        snils.validate( str );
        validation = snils.getValidation( str );
    } );
    it( 'Generated is valid', function () {
        assert.equal( true, snils.validate( str ) );
        assert.equal( true, service.checkValidation( validation ) );
    } );
    it( 'Validation could fail', function () {
        assert.equal( false, snils.validate( str + '1' ) );
    } );

    it( 'Checksum validation could fail', function () {
        const check = parseInt( str.slice( 9, 11 ) );
        const badStr = str.slice( 0, 9 ) + ( check + 1 % 10 );
        const badValidation = snils.getValidation( badStr );
        assert.equal( false, snils.validate( badStr ) );
        assert.equal( badValidation.check, false );
    } );
    it( 'It validates by length', function () {
        const badStr = str + '1';
        const badValidation = snils.getValidation( badStr );
        assert.equal( false, snils.validate( badStr ) );
        assert.equal( badValidation.lengthVal, false );
    } );

    // TODO Add test like ogrn

} );
