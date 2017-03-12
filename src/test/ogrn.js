'use strict';

const assert = require( 'assert' );
const ogrnGeneratorFabric = require( './../lib/ogrn.js' );

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

    function checkValidation ( validation, checks, defaultCheck ) {
        defaultCheck = ( defaultCheck === undefined ? true : defaultCheck );
        checks = checks || {};
        Object.keys( validation ).map( function ( key ) {
            const check = ( checks[ key ] !== undefined ? checks[ key ] : defaultCheck );
            assert.equal( validation[ key ], check );
        } );
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
            let validation;

            it( 'It validates', function () {
                validation = generator.validate( str );
            } );

            it( 'Generated is valid', function () {
                checkValidation( validation );
            } );


            it( 'Checksum validation could fail', function () {
                const checksum = parseInt( str[ 12 ] );
                const badStr = str.slice( 0, 12 ) + ( ( checksum + 1 ) % 10 );

                const badValidation = generator.validate( badStr );

                checkValidation( badValidation, {
                    check: false
                } );
            } );

            it ( 'It validates by length', function () {
                const badStr = str + '1';

                const badValidation = generator.validate( badStr );

                checkValidation( badValidation, {
                    lengthVal: false
                } );
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
            let validation = generator.validate( testStr );
            checkValidation( validation );

            const badStr = "012123456789000";
            validation = generator.validate( badStr );
            checkValidation( validation, {}, false );
        } )
    } );
    

} );