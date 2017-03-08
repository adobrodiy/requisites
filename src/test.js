'use strict';

var files = require( 'fs' ).readdirSync( __dirname + '/test/' );

for ( var index in files ) {
    require( './test/' + files[ index ] );
}