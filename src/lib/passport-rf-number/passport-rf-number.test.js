'use strict';
const assert = require( 'assert' );
const service = require( './../service/service.js' );
const passportRfNumberFactory = require( './passport-rf-number.js' );

const years = ["17", "16", "15"];
const numbers = ["283257", "925750", "835995"];

const badYear = "14";
const badNumber = "283258";
const badSubject = "00";

describe( "Passport RF number service test", function () {
    const passportNumber = passportRfNumberFactory( {
        subjects: require( './../subjects.json' ),
        years: years,
        numbers: numbers
    } );

    let str;
    let validation;
    it( 'It generates something', function () {
        str = passportNumber.generate();
    } );
    it( 'Generated has valid length', function () {
        assert.equal( str.length, 10 );
    } );

    it( 'It validates', function () {
        passportNumber.validate( str );
        validation = passportNumber.getValidation( str );
    } );
    it( 'Generated is valid', function () {
        assert.equal( true, passportNumber.validate( str ) );
        assert.equal( true, service.checkValidation( validation ) );
    } );
    it( 'Validation could fail', function () {
        assert.equal( false, passportNumber.validate( str + '1' ) );
    } );

    it( 'It validates by length', function () {
        const badStr = str + '1';
        const badValidation = passportNumber.getValidation( badStr );
        assert.equal( false, passportNumber.validate( badStr ) );
        assert.equal( badValidation.lengthVal, false );
        [ "subject", "year", "number" ].forEach( key => {
            assert.equal( true, badValidation[ key ] );
        } );
    } );
    it( 'It validates by subject', function () {
        const badStr = badSubject + str.slice( 2, 10 );
        const badValidation = passportNumber.getValidation( badStr );
        assert.equal( false, passportNumber.validate( badStr ) );
        assert.equal( badValidation.subject, false );
        [ "lengthVal", "year", "number" ].forEach( key => {
            assert.equal( true, badValidation[ key ] );
        } );
    } );
    it( 'It validates by year', function () {
        const badStr = str.slice( 0, 2 ) + badYear + str.slice( 4, 10 );
        const badValidation = passportNumber.getValidation( badStr );
        assert.equal( false, passportNumber.validate( badStr ) );
        assert.equal( badValidation.year, false );
        [ "lengthVal", "subject", "number" ].forEach( key => {
            assert.equal( true, badValidation[ key ] );
        } );
    } );
    it( 'It validates by number', function () {
        const badStr = str.slice( 0, 4 ) + badNumber;
        const badValidation = passportNumber.getValidation( badStr );
        assert.equal( false, passportNumber.validate( badStr ) );
        assert.equal( badValidation.number, false );
        [ "lengthVal", "subject", "year" ].forEach( key => {
            assert.equal( true, badValidation[ key ] );
        } );
    } );

    // TODO Add test like ogrn
} );
