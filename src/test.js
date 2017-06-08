'use strict';
const path = require( 'path' );
// TODO Find file by recursive checking folders
const files = [
    [ 'ogrn', 'ogrn.test.js' ],
    [ 'person-inn', 'person-inn.test.js' ],
    [ 'service', 'service.test.js' ]
];

files.forEach( function ( file ) {
    require( path.resolve.apply( null, [ __dirname, 'lib' ].concat( file ) ) );
} );