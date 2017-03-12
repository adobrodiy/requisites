'use strict';

const files = require( 'fs' ).readdirSync( __dirname + '/test/' );

files.forEach( function ( file ) {
    require( `./test/${ file }` );
} );
