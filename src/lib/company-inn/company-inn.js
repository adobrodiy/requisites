'use strict';
/**
 * @param   {Object}        options
 * @param   {Array}         options.subjects
 * @param   {Object|Array}  options.codes
 * @param   {Array}         options.numbers     array of five-digit strings
 * @returns {{generate: (function()), validate: (function(): Boolean), getValidation: (function())}}
 */
module.exports = function (
    options,
    service = require( './../service/service.js' )
) {
    options = JSON.parse( JSON.stringify( options ) );
    const getCodes = Array.isArray( options.codes ) ?
        ()      => options.codes :
        subject => options.codes[ subject ];

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
        getValidation: validate,
        /**
         * @param  {String} str 8-digit string
         * @return {Number} 1-digit number - checksum
         */
        getCheck: getCheck
    };

    function generate () {
        const subject     = service.getRandomElement( options.subjects       );
        const code        = service.getRandomElement( getCodes( subject )    );
        const number      = service.getRandomElement( options.numbers        );

        let str = '' + subject + code + number;
        str += getCheck(  str );

        return str;
    }

    function validate ( str ) {
        str = str || '';
        const subject       = str.slice( 0, 2  );
        const code          = str.slice( 2, 4  );
        const number        = str.slice( 4, 9  );
        const check         = str.slice( 9, 10 );

        const valid = {};
        valid.lengthVal = str.length == 10;
        valid.subject   = options.subjects   .includes( subject );
        valid.code      = getCodes( subject ).includes( code    );
        valid.number    = options.numbers    .includes( number  );
        const checkStr  = '' + subject + code + number;
        valid.check     = getCheck( checkStr ) == check;

        return valid;
    }

    function getCheck ( str ) {
        return (
            2  * str[ 0 ] +
            4  * str[ 1 ] +
            10 * str[ 2 ] +
            3  * str[ 3 ] +
            5  * str[ 4 ] +
            9  * str[ 5 ] +
            4  * str[ 6 ] +
            6  * str[ 7 ] +
            8  * str[ 8 ]
        ) % 11 % 10;
    }
};
(8 * 2  + 7 * 4  + 6 * 10 + 5 * 3  + 8 * 5  + 7 * 9  + 6 * 4  + 5 * 6  + 4 * 8 ) %11 %10