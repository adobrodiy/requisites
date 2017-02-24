'use strict';

var assert = require( 'assert' );

describe( 'Requisites generator', function () {

    var generatorFabric = require( './../index' );
    var testGenerator = require( './test-generator.js' );

    describe( 'default config', function () {

        var generator = generatorFabric();

        testGenerator( generator );

    } );

    describe( 'default callbacks config, but custom options', function () {
        var generator = generatorFabric( {
            yearsLength : 5,
            codesCount  : 4,
            numbersCount: 3
        } );

        testGenerator( generator );

    } );

    describe( 'custom config', function () {
        var generator = generatorFabric( null, {
            years: function () {
                return [ "17", "16", "15" ];
            },
            codes: function ( subject ) {
                return {
                    "01" : [ "13", "66" ],
                    "02" : [ "81", "04" ]
                }[ subject ];
            },
            numbers: function () {
                return [ "12345", "54321" ];
            },
            initVals: function () {
                return [ "2", "3" ];
            },
            subjects: function () {
                return [ "01", "02" ];
            }
        } );

        testGenerator( generator );

    } );

    describe( 'result depends on config', function () {

        var generator = generatorFabric( null, {
            initVals: function () { return [ "9" ] },
            years: function () { return [ "01" ]; },
            subjects: function () { return [ "01" ] },
            codes: function ( subject ) { return [ "23" ]; },
            numbers: function () { return [ "45678" ]; }
        } );

        var str = generator.generate();
        var testStr = "901012345678";
        var check = parseInt( testStr ) % 11 % 10;
        testStr += check.toString();

        it( 'it generates by config', function () {
            assert.equal( str, testStr );
        } );

        it( 'it validates by config', function () {
            var validation = generator.validate( testStr );
            for ( var key in validation ) {
                assert.equal( true, validation[ key ] );
            }
            var badStr = "012123456789000";
            validation = generator.validate( badStr );
            for ( var key in validation ) {
                assert.equal( false, validation[ key ] );
            }
        } )
    } );

} );