'use strict';
const assert = require( 'assert' );
const service = require( './../service/service.js' );
const ogrnGeneratorFabric = require( './ogrn.js' );

describe( 'Ogrn generator', function () {
    const options = {
        initVals: [ "2", "3" ],
        years: [ "17", "16", "15" ],
        subjects: [ "01", "02" ],
        codes: {
            "01" : [ "13", "66" ],
            "02" : [ "81", "04" ]
        },
        numbers: [ "12345", "54321" ]
    };
    const optionsWithCodesArray = {
        initVals: [ "2", "3" ],
        years: [ "17", "16", "15" ],
        subjects: [ "01", "02" ],
        codes: [ "13", "66" ],
        numbers: [ "12345", "54321" ]
    };
    const optionsForSingle = {
        initVals: [ "9" ],
        years: [ "01" ],
        subjects: [ "01" ],
        codes: [ "23" ],
        numbers: [ "45678" ]
    };

    it( 'It eats config with codes object', function () {
        ogrnGeneratorFabric( options );
    } );
    it( 'It eats config with codes array', function () {
        ogrnGeneratorFabric( optionsWithCodesArray );
    } );

    function testGenerator ( generator ) {
        describe( 'Generate method', function () {
            let str;
            it( 'It generates something', function () {
                str = generator.generate();
            } );
            it( ' Generated has valid length', function () {
                assert.equal( 13, str.length );
            } )
        }  );
        describe( 'Validate method', function () {
            let str = generator.generate();
            let valid, validation;
            it( 'It validates', function () {
                valid = generator.validate( str );
                validation = generator.getValidation( str );
            } );
            it( 'Generated is valid', function () {
                assert( true, valid );
                assert( true, service.checkValidation( validation ) );
            } );
            it( 'Checksum validation could fail', function () {
                const checksum = parseInt( str[ 12 ] );
                const badStr = str.slice( 0, 12 ) + ( ( checksum + 1 ) % 10 );
                assert.equal( false, generator.validate( badStr ) );
                const badValidation = generator.getValidation( badStr );
                assert.equal( false, badValidation.check );
                const clearValidation = Object.assign( {}, badValidation, { check: true } );
                assert.equal( true, service.checkValidation( clearValidation ) );
            } );

            it ( 'It validates by length', function () {
                const badStr = str + '1';
                assert.equal( false, generator.validate( badStr ) );
                const badValidation = generator.getValidation( badStr );
                assert.equal( false, badValidation.lengthVal );
                const clearValidation = Object.assign( {}, badValidation, { lengthVal: true } );
                assert.equal( true, service.checkValidation( clearValidation ) );
            } );

        } );
    }

    describe( ' Generator with codes object configured', function () {
        const generator = ogrnGeneratorFabric( options );
        testGenerator( generator );
    } );

    describe( 'Generator with codes array configured', function () {
        const generator = ogrnGeneratorFabric( optionsWithCodesArray );
        testGenerator( generator );
    } );

    describe( 'Result depends on config', function () {
        const generator = ogrnGeneratorFabric( optionsForSingle );

        const str = generator.generate();
        let testStr = "901012345678";
        const check = parseInt( testStr ) % 11 % 10;
        testStr += check.toString();

        it( 'It generates by config', function () {
            assert.equal( str, testStr );
        } );

        it( 'It validates by config', function () {
            assert( true, generator.validate( testStr ) );
            let validation = generator.getValidation( testStr );
            assert.equal( true, service.checkValidation( validation ) );

            const badStr = "012123456789000";
            assert.equal( false, generator.validate( badStr ) );
            validation = generator.getValidation( badStr );
            assert.equal( false, Object.keys( validation ).some( key => validation[ key ] ) );
        } )
    } );

} );