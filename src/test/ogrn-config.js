'use strict';

var assert = require( 'assert' );
var ogrnConfigFabric = require( './../lib/ogrn-config.js' );

describe( 'Ogrn config', function () {

    var options = {
        yearsLength: 2,
        codesCount: 3,
        numbersCount: 4
    };

    var resultProps = [
        'initVals', 'years', 'subjects', 'codes', 'numbers'
    ];

    var config;

    it( 'It instants', function () {
        config = ogrnConfigFabric( options );
    } );

    it( 'Result has required props', function () {
        for ( var index in resultProps ) {
            assert.notEqual( config[ resultProps[ index ] ], undefined );
        }
    } );

    it( 'It gets options.yearsLength', function () {
        assert.equal( options.yearsLength, config.years.length );
    } );

    it( 'It gets options.codesCount', function () {
        assert.equal( options.codesCount, config.codes.length );
    } );

    it( 'It gets options.numbersCount', function () {
        assert.equal( options.numbersCount, config.numbers.length );
    } );

} );