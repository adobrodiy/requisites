'use strict';

var assert = require( 'assert' );
var ogrnGeneratorFabric = require( './../lib/ogrn.js' );

describe( 'Ogrn generator', function () {

    var options = {
        initVals: [ "2", "3" ],
        years: [ "17", "16", "15" ],
        subjects: [ "01", "02" ],
        codes: {
            "01" : [ "13", "66" ],
            "02" : [ "81", "04" ]
        },
        numbers: [ "12345", "54321" ]
    };

    var optionsWithCodesArray = {
        initVals: [ "2", "3" ],
        years: [ "17", "16", "15" ],
        subjects: [ "01", "02" ],
        codes: [ "13", "66" ],
        numbers: [ "12345", "54321" ]
    };

    var optionsForSingle = {
        initVals: [ "9" ],
        years: [ "01" ],
        subjects: [ "01" ],
        codes: [ "23" ],
        numbers: [ "45678" ]
    };

    var checkValidation = function ( validation, checks, defaultCheck ) {
        defaultCheck = ( defaultCheck === undefined ? true : defaultCheck );
        checks = checks || {};
        var key, check;
        for ( key in validation ) {
            check = ( checks[ key ] !== undefined ? checks[ key ] : defaultCheck );
            assert.equal( validation[ key ], check );
        }
    };

    it( 'It eats config with codes object', function () {
        ogrnGeneratorFabric( options );
    } );

    it( 'It eats config with codes array', function () {
        ogrnGeneratorFabric( optionsWithCodesArray );
    } );

    function testGenerator ( generator ) {
        describe( 'Generate method', function () {

            var str;

            it( 'It generates something', function () {
                str = generator.generate();
            } );

            it( ' Generated has valid length', function () {
                assert.equal( 13, str.length );
            } )
        }  );

        describe( 'Validate method', function () {

            var str = generator.generate();
            var validation;

            it( 'It validates', function () {
                validation = generator.validate( str );
            } );

            it( 'Generated is valid', function () {
                checkValidation( validation );
            } );


            it( 'Checksum validation could fail', function () {
                var checksum = parseInt( str[ 12 ] );
                var badStr = str.slice( 0, 12 ) + ( ( checksum + 1 ) % 10 );

                var badValidation = generator.validate( badStr );

                checkValidation( badValidation, {
                    check: false
                } );
            } );

            it ( 'It validates by length', function () {
                var badStr = str + '1';

                var badValidation = generator.validate( badStr );

                checkValidation( badValidation, {
                    lengthVal: false
                } );
            } );

        } );
    }

    describe( ' Generator with codes object configured', function () {

        var generator = ogrnGeneratorFabric( options );

        testGenerator( generator );

    } );

    describe( 'Generator with codes array configured', function () {

        var generator = ogrnGeneratorFabric( optionsWithCodesArray );

        testGenerator( generator );

    } );

    describe( 'Result depends on config', function () {

        var generator = ogrnGeneratorFabric( optionsForSingle );

        var str = generator.generate();
        var testStr = "901012345678";
        var check = parseInt( testStr ) % 11 % 10;
        testStr += check.toString();

        it( 'It generates by config', function () {
            assert.equal( str, testStr );
        } );

        it( 'It validates by config', function () {
            var validation = generator.validate( testStr );
            checkValidation( validation );

            var badStr = "012123456789000";
            validation = generator.validate( badStr );
            checkValidation( validation, {}, false );
        } )
    } );
    

} );