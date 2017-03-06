'use strict';

function getRandomElement ( array ) {
    return array[ Math.floor( Math.random() * array.length ) ];
}
/**
 * Fabric returns ogrn generator instance
 * @param options
 * @param options.initVals  array of single-digit strings
 * @param options.years     array of two-digit strings
 * @param options.subjects  array of two-digit strings
 * @param options.codes     object of arrays by subject. each array contains two-digit strings
 * @param options.numbers   array of five-digit strings
 *
 * @returns {{generate: generate, validate: validate}}
 */
module.exports = function ogrnFactory ( options ) {

    options = JSON.parse( JSON.stringify( options ) );

    var getCodes;

    // Checks if it is array
    if ( options.codes.length ) {
        getCodes = function () {
            return options.codes;
        };
    }
    else {
        getCodes = function ( subject ) {
            return options.codes[ subject ];
        };
    }

    return {
        generate: function () {
            var initVal     = getRandomElement( options.initVals            );
            var year        = getRandomElement( options.years               );
            var subject     = getRandomElement( options.subjects            );
            var code        = getRandomElement( getCodes( subject )         );
            var number      = getRandomElement( options.numbers             );

            var str = '' + initVal + year + subject + code + number;

            var check = parseInt( str ) % 11 % 10 ;

            str += check;

            return str;
        },

        validate: function ( str ) {
            str = str || '';
            var initVal         = str[ 0 ];
            var year            = str.slice( 1, 3 );
            var subject         = str.slice( 3, 5 );
            var code            = str.slice( 5, 7 );
            var number          = str.slice( 7, 12 );
            var check           = str[ 12 ];

            var valid = {};
            valid.lengthVal     = str.length === 13;
            valid.initVal       = options.initVals          .indexOf( initVal   ) !== -1;
            valid.year          = options.years             .indexOf( year      ) !== -1;
            valid.subject       = options.subjects          .indexOf( subject   ) !== -1;
            valid.code          = getCodes( subject )       .indexOf( code      ) !== -1;
            valid.number        = options.numbers           .indexOf( number    ) !== -1;

            var checkStr = '' + initVal + year + subject + code + number;

            valid.check = parseInt( checkStr ) % 11 % 10 == check ;

            return valid;
        }
    };
} ;