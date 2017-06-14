'use strict';
/**
 * @param options
 * @param options.years     array of two-digit strings
 * @param options.subjects  array of two-digit strings
 * @param options.numbers   array of six-digit strings
 * @returns {{generate: generate, validate: validate}}
 */
module.exports = function (
    options,
    service = require( './../service/service.js' )
) {
    options = JSON.parse( JSON.stringify( options ) );

    return {
        // TODO Add jsdoc
        generate: generate,
        // TODO Add jsdoc
        validate: str => service.checkValidation( validate( str ) ),
        // TODO Add jsdoc
        getValidation: validate
    };

    function generate () {
        const year        = service.getRandomElement( options.years               );
        const subject     = service.getRandomElement( options.subjects            );
        const number      = service.getRandomElement( options.numbers             );

        const str = '' + subject+ year + number;
        return str;
    }

    function validate ( str ) {
        str = str || '';
        const subject  = str.slice( 0, 2  );
        const year     = str.slice( 2, 4  );
        const number   = str.slice( 4, 10 );

        const valid = {};
        valid.lengthVal  = str.length === 10;
        valid.subject    = options.subjects   .indexOf( subject   ) !== -1;
        valid.year       = options.years      .indexOf( year      ) !== -1;
        valid.number     = options.numbers    .indexOf( number    ) !== -1;

        return valid;
    }
} ;
