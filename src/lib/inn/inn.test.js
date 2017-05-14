'use strict';

'use strict';

function getCodes ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 90 ) + 10;
    } );
    return result;
}

function getNumbers ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 899999 ) + 100000;
    } );
    return result;
}

const inn = require( './inn.js' )( {
    subjects: require( './../subjects.json' ),
    codes: getCodes( 20 ),
    numbers: getNumbers( 20 )
} );

describe( "Inn service test", function () {

    it( "", function () {

        console.log( inn.generate() );
        console.log( inn.generate() );
        console.log( inn.generate() );
        console.log( inn.generate() );
        console.log( inn.generate() );

        return true;

    } );

} );
