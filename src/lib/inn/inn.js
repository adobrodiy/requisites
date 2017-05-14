'use strict';

function getRandomElement ( array ) {
    return array[ Math.floor( Math.random() * array.length ) ];
}

const service = require( './../service/service.js' );

/**
 *
 * @param   {Object}        options
 * @param   {Array}         options.subjects
 * @param   {Object|Array}  options.codes
 * @param   {Array}         options.numbers     array of six-digit strings
 * 
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
            const subject     = getRandomElement( options.subjects       );
            const code        = getRandomElement( getCodes( subject )    );
            const number      = getRandomElement( options.numbers        );

            let str = '' + subject + code + number;
            str += service.getInnFirstCheck( str );
            str += service.getInnSecondCheck( str );

            return str;
        },
        validate: function ( str ) {
            return {};
        }
    }
};