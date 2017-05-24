'use strict';
const service = require( './../service/service.js' );
/**
 * @param   {Object}        options
 * @param   {Array}         options.subjects
 * @param   {Object|Array}  options.codes
 * @param   {Array}         options.numbers     array of six-digit strings
 * @returns {{generate: generate, validate: validate}}
 */
module.exports = function innFactory ( options ) {
    options = JSON.parse( JSON.stringify( options ) );

    let getCodes;

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
            const subject     = service.getRandomElement( options.subjects       );
            const code        = service.getRandomElement( getCodes( subject )    );
            const number      = service.getRandomElement( options.numbers        );

            let str = '' + subject + code + number;
            str += service.getInnFirstCheck( str );
            str += service.getInnSecondCheck( str );

            return str;
        },
        validate: function ( str ) {
            str = str || '';
            const subject       = str.slice( 0 , 2  );
            const code          = str.slice( 2 , 4  );
            const number        = str.slice( 4 , 10 );
            const firstCheck    = str.slice( 10, 11 );
            const secondCheck   = str.slice( 11, 12 );

            const valid = {};
            valid.lengthVal         = str.length == 12;
            valid.subject           = options.subjects      .indexOf( subject   ) !== -1;
            valid.code              = getCodes( subject )   .indexOf( code      ) !== -1;
            valid.number            = options.numbers       .indexOf( number    ) !== -1;
            const firstCheckStr     = '' + subject + code + number;
            valid.firstCheck        = service.getInnFirstCheck( firstCheckStr )    == firstCheck;
            const secondCheckStr    = firstCheckStr + firstCheck;
            valid.secondCheck       = service.getInnSecondCheck( secondCheck )     == secondCheck;
            return valid;
        }
    }
};