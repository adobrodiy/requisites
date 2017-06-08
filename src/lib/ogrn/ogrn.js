'use strict';
/**
 * Fabric returns ogrn generator instance
 * @param options
 * @param options.initVals  array of single-digit strings
 * @param options.years     array of two-digit strings
 * @param options.subjects  array of two-digit strings
 * @param options.codes     object of arrays by subject. each array contains two-digit strings
 * @param options.numbers   array of five-digit strings
 * @returns {{generate: generate, validate: validate}}
 */
module.exports = function (
    options,
    service = require( './../service/service.js' )
) {
    options = JSON.parse( JSON.stringify( options ) );
    const getCodes = options.codes.length ?
        ()      => options.codes :
        subject => options.codes[ subject ];

    return {
        // TODO Add jsdoc
        generate: generate,
        // TODO Add jsdoc
        validate: str => service.checkValidation( validate( str ) ),
        // TODO Add jsdoc
        getValidation: validate
    };

    function generate () {
        const initVal     = service.getRandomElement( options.initVals            );
        const year        = service.getRandomElement( options.years               );
        const subject     = service.getRandomElement( options.subjects            );
        const code        = service.getRandomElement( getCodes( subject )         );
        const number      = service.getRandomElement( options.numbers             );

        let str = '' + initVal + year + subject + code + number;
        const check = parseInt( str ) % 11 % 10 ;
        str += check;
        return str;
    }

    function validate ( str ) {
        str = str || '';
        const initVal  = str[ 0 ];
        const year     = str.slice( 1, 3 );
        const subject  = str.slice( 3, 5 );
        const code     = str.slice( 5, 7 );
        const number   = str.slice( 7, 12 );
        const check    = str[ 12 ];

        const valid = {};
        valid.lengthVal  = str.length === 13;
        valid.initVal    = options.initVals   .indexOf( initVal   ) !== -1;
        valid.year       = options.years      .indexOf( year      ) !== -1;
        valid.subject    = options.subjects   .indexOf( subject   ) !== -1;
        valid.code       = getCodes( subject ).indexOf( code      ) !== -1;
        valid.number     = options.numbers    .indexOf( number    ) !== -1;

        const checkStr = '' + initVal + year + subject + code + number;
        valid.check = parseInt( checkStr ) % 11 % 10 == check ;
        return valid;
    }
} ;