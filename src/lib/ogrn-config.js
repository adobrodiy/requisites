'use strict';

var INIT_VALS = [ "1", "5" ];
var SUBJECTS = require( './subjects.json' );

var DEFAULTS = {
    yearsLength     : 20,
    codesCount      : 20,
    numbersCount    : 20
};

function getYears ( yearsLength ) {
    var year = ( new Date() ).getFullYear() ;
    var result = [];
    for ( var i = 0; i < yearsLength; i++ ) {
        result.push( ( year - i ).toString().slice( 2 ) );
    }
    return result;
}

function getCodes ( count ) {
    var item;
    var result = [];
    for ( var i = 0; i < count; i++ ) {
        item = Math.floor( Math.random() * 90 ) + 10;
        result.push( item.toString() );
    }
    return result;
}

function getNumbers ( count ) {
    var item;
    var result = [];
    for ( var i = 0; i < count; i++ ) {
        item = Math.floor( Math.random() * 89999 ) + 10000;
        result.push( item.toString() );
    }
    return result;
}

module.exports = function ( options ) {

    options = options || {};

    options.yearsLength  = options.yearsLength   || DEFAULTS.yearsLength  ;
    options.codesCount   = options.codesCount    || DEFAULTS.codesCount   ;
    options.numbersCount = options.numbersCount  || DEFAULTS.numbersCount ;

    var result = {
        initVals     : INIT_VALS                             ,
        years        : getYears( options.yearsLength )       ,
        subjects     : SUBJECTS                              ,
        codes        : getCodes( options.codesCount )        ,
        numbers      : getNumbers( options.numbersCount )
    };

    return result;
    
};