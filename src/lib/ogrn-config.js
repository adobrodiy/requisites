'use strict';

const INIT_VALS = [ "1", "5" ];
const SUBJECTS = require( './subjects.json' );

const DEFAULTS = {
    yearsLength     : 20,
    codesCount      : 20,
    numbersCount    : 20
};

function getYears ( yearsLength ) {
    const year = ( new Date() ).getFullYear() ;
    const result = [...Array( yearsLength ).keys() ].map( function ( index ) {
        return ( year - index ).toString().slice( 2 );
    } );
    return result;
}

function getCodes ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 90 ) + 10;
    } );
    return result;
}

function getNumbers ( count ) {
    const result = [...Array( count ).keys() ].map( function () {
        return Math.floor( Math.random() * 89999 ) + 10000;
    } );
    return result;
}

module.exports = function ( options ) {

    options = options || {};

    options.yearsLength  = options.yearsLength   || DEFAULTS.yearsLength  ;
    options.codesCount   = options.codesCount    || DEFAULTS.codesCount   ;
    options.numbersCount = options.numbersCount  || DEFAULTS.numbersCount ;

    const result = {
        initVals     : INIT_VALS                             ,
        years        : getYears( options.yearsLength )       ,
        subjects     : SUBJECTS                              ,
        codes        : getCodes( options.codesCount )        ,
        numbers      : getNumbers( options.numbersCount )
    };

    return result;
    
};