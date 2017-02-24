'use strict';

var assert = require( 'assert' );

/**
 * It tests configured ogrn generator
 * @param generator
 */
module.exports = function testGenerator ( generator ) {

    describe( 'generate', function () {

        var str;

        it( 'generated', function () {
            str = generator.generate();
        } );

        it( 'has valid length', function () {
            assert.equal( 13, str.length );
        } )
    }  );

    describe( 'validate', function () {

        var str = generator.generate();
        var validation;

        it( 'validated', function () {
            validation = generator.validate( str );
        } );

        it( 'generated is valid', function () {
            for ( var key in validation ) {
                assert.equal( true, validation[ key ] );
            }
        } );


        it( 'checksum validation could fail', function () {
            var checksum = parseInt( str[ 12 ] );
            var badStr = str.slice( 0, 12 ) + ( ( checksum + 1 ) % 10 );

            var badValidation = generator.validate( badStr );

            for ( var key in badValidation ) {
                assert.equal( key !== 'check', badValidation[ key ] );
            }
        } );

        it ( 'validates by length', function () {
            var badStr = str + '1';

            var badValidation = generator.validate( badStr );

            for ( var key in badValidation ) {
                assert.equal( key !== 'lengthVal', badValidation[ key ] );
            }
        } );
    } );

};