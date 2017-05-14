'use strict';

const service   = require( './service.js'   );
const assert    = require( 'assert'         );

describe( "Inn service test", function () {

    describe( 'getInnFirstCheck', function () {

        it( "", function () {
            assert.equal( service.getInnFirstCheck( '5001007322' ), 5 );
            assert.equal( service.getInnFirstCheck( '6273719830' ), 8 );
            assert.equal( service.getInnFirstCheck( '3410548860' ), 0 );
            assert.equal( service.getInnFirstCheck( '1554982945' ), 9 );
            assert.equal( service.getInnFirstCheck( '5413548860' ), 0 );
            assert.equal( service.getInnFirstCheck( '2656676186' ), 5 );
            //assert.equal( service.getInnFirstCheck( '7728075928' ), 3 );
        } );

    } );

    describe( 'getInnSecondCheck', function () {

        it( "", function () {
            assert.equal( service.getInnSecondCheck( '50010073225' ), 9 );
            //assert.equal( service.getInnSecondCheck( '77280759283' ), 6 );
            assert.equal( service.getInnFirstCheck( '62737198308' ), 5 );
            assert.equal( service.getInnFirstCheck( '34105488600' ), 6 );
            assert.equal( service.getInnFirstCheck( '15549829459' ), 2 );
            assert.equal( service.getInnFirstCheck( '54135488600' ), 2 );
            assert.equal( service.getInnFirstCheck( '26566761865' ), 2 );
        } );

    } );

} );
