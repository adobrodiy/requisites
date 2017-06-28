'use strict';
/**
 * @param   {Object}        options
 * @param   {String[]}      options.initVals  array of single-digit strings
 * @param   {String[]}      options.years     array of two-digit strings
 * @param   {String[]}      options.subjects  array of two-digit strings
 * @param   {String[]}      options.numbers   array of nine-digit strings
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
        const initVal     = service.getRandomElement( options.initVals            );
        const year        = service.getRandomElement( options.years               );
        const subject     = service.getRandomElement( options.subjects            );
        const number      = service.getRandomElement( options.numbers             );

        let str = '' + initVal + year + subject + number;
        const check = parseInt( str ) % 13 % 10 ;
        str += check;
        return str;
    }

    function validate ( str = '' ) {
        const initVal  = str[ 0 ];
        const year     = str.slice( 1, 3 );
        const subject  = str.slice( 3, 5 );
        const number   = str.slice( 5, 14 );
        const check    = str[ 14 ];

        const valid = {};
        valid.lengthVal         = str.length == 15;
        valid.initVal           = options.initVals.includes( initVal );
        valid.year              = options.years   .includes( year    );
        valid.subject           = options.subjects.includes( subject );
        valid.number            = options.numbers .includes( number  );
        const checkStr = '' + initVal + year + subject + number;
        valid.check = parseInt( checkStr ) % 13 % 10 == check ;
        return valid;
    }
};
