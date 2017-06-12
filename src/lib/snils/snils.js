'use strict';
/**
 * @param   {Object}        options
 * @param   {Array}         options.numbers     array of nine-digit strings
 * @returns {{generate: (function()), validate: (function(): Boolean), getValidation: (function())}}
 */
module.exports = function (
    options,
    service = require( './../service/service.js' )
) {
    options = JSON.parse( JSON.stringify( options ) );

    return {
        /**
         * @return {String} inn
         */
        generate: generate,
        /**
         * @param   {String}    str
         * @return  {Boolean}
         */
        validate: str => service.checkValidation( validate( str ) ),
        /**
         * @param   {String}    str
         * @return  {Object}    validation
         */
        getValidation: validate
    };

    function generate () {
        const number = service.getRandomElement( options.numbers );
        let str = '' + number;
        str += service.getSnilsCheck( str );
        return str;
    }

    function validate ( str ) {
        str = str || '';
        const number        = str.slice( 0 , 9 );
        const check         = str.slice( 9, 11 );

        const valid = {};
        valid.lengthVal   = str.length == 11;
        valid.number      = options.numbers.indexOf( number ) !== -1;
        valid.check       = service.getSnilsCheck( number ) == check;
        return valid;
    }
};
