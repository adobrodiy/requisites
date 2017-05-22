'use strict';

const service   = require( './service.js'   );
const assert    = require( 'assert'         );

describe( "Inn service test", function () {

    it( 'getInnFirstCheck', function () {
        assert.equal( service.getInnFirstCheck( '5001007322' ), 5 );
        assert.equal( service.getInnFirstCheck( '6273719830' ), 8 );
        assert.equal( service.getInnFirstCheck( '3410548860' ), 0 );
        assert.equal( service.getInnFirstCheck( '1554982945' ), 9 );
        assert.equal( service.getInnFirstCheck( '5413548860' ), 0 );
        assert.equal( service.getInnFirstCheck( '2656676186' ), 5 ); // checked by hands
    } );

    it( 'getInnSecondCheck', function () {
        assert.equal( service.getInnSecondCheck( '50010073225' ), 9 );
        assert.equal( service.getInnSecondCheck( '62737198308' ), 5 );
        assert.equal( service.getInnSecondCheck( '34105488600' ), 6 );
        assert.equal( service.getInnSecondCheck( '15549829459' ), 2 );
        assert.equal( service.getInnSecondCheck( '54135488600' ), 2 );
        assert.equal( service.getInnSecondCheck( '26566761865' ), 2 );
    } );

    it( 'getRandomElement', function () {
        const array = [ 1, '2', { foo: 'bar' }, [ 42 ] ];
        const element = service.getRandomElement( array );
        const index = array.indexOf( element );
        assert.notEqual( index, -1 );
    } );

} );
