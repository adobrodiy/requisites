'use strict';

const assert = require( 'assert' );
const ogrnConfigFabric = require( './../lib/ogrn-config.js' );

describe( 'Ogrn config', function () {

    const options = {
        yearsLength: 2,
        codesCount: 3,
        numbersCount: 4
    };

    const resultProps = [
        'initVals', 'years', 'subjects', 'codes', 'numbers'
    ];

    let config;

    it( 'It instants', function () {
        config = ogrnConfigFabric( options );
    } );

    it( 'Result has required props', function () {
        resultProps.forEach( function ( key ) {
            assert.notEqual( config[ key ], undefined );
        } );
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