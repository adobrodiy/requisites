'use strict';

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

function getRandomElement ( array ) {
    return array[ Math.floor( Math.random() * array.length ) ];
}

var DEFAULTS = {
    options: {
        yearsLength : 20,
        codesCount  : 20,
        numbersCount: 20
    },
    callbacks: {
        years       : getYears,
        codes       : getCodes,
        numbers     : getNumbers,
        initVals    : function () {
            return [ '1', '5' ];
        },
        subjects    : function () {
            return require( './subjects.json' );
        }
    }
};

module.exports = function factory ( options, callbacks ) {
    options = options || {};
    var key;

    for ( key in DEFAULTS.options ) {
        options[ key ] = options[ key ] || DEFAULTS.options[ key ];
    }

    var data = {};
    callbacks = callbacks || {};
    if ( !callbacks.years ) {
        data.years = DEFAULTS.callbacks.years( options.yearsLength );
        callbacks.years = function () {
            return data.years
        };
    }
    if ( !callbacks.codes ) {
        data.codes = DEFAULTS.callbacks.codes( options.codesCount );
        callbacks.codes = function ( subject ) { return data.codes };
    }
    if ( !callbacks.numbers ) {
        data.numbers = DEFAULTS.callbacks.numbers( options.numbersCount );
        callbacks.numbers = function () { return data.numbers };
    }

    for ( key in DEFAULTS.callbacks ) {
        if ( callbacks[ key ] ) {
            continue;
        }
        // We need it for correct key closure
        ( function ( key ) {
            data[ key ] = DEFAULTS.callbacks[ key ]();
            callbacks[ key ] = function () {
                return data[ key ];
            };
        } )( key );
    }

    return {
        generate: function () {
            var initVal     = getRandomElement( callbacks.initVals()            );
            var year        = getRandomElement( callbacks.years()               );
            var subject     = getRandomElement( callbacks.subjects()            );
            var code        = getRandomElement( callbacks.codes( subject )      );
            var number      = getRandomElement( callbacks.numbers()             );

            var str = '' + initVal + year + subject + code + number;

            var check = parseInt( str ) % 11 % 10 ;

            str += check;

            return str;
        },

        validate: function ( str ) {
            var initVal         = str[ 0 ];
            var year            = str.slice( 1, 3 );
            var subject         = str.slice( 3, 5 );
            var code            = str.slice( 5, 7 );
            var number          = str.slice( 7, 12 );
            var check           = str[ 12 ];

            var valid = {};
            valid.lengthVal     = str.length === 13;
            valid.initVal       = callbacks.initVals()          .indexOf( initVal   ) !== -1;
            valid.year          = callbacks.years()             .indexOf( year      ) !== -1;
            valid.subject       = callbacks.subjects()          .indexOf( subject   ) !== -1;
            valid.code          = callbacks.codes( subject )    .indexOf( code      ) !== -1;
            valid.number        = callbacks.numbers()           .indexOf( number    ) !== -1;

            var checkStr = '' + initVal + year + subject + code + number;

            valid.check = parseInt( checkStr ) % 11 % 10 == check ;

            return valid;
        }
    };
};