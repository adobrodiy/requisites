'use strict';

const DEFAULTS = {
    person: true
};
const SUBJECTS = require( './subjects.json' );

module.exports = function ( options ) {

    const result = {
        person: typeof options.person === "undefined" ? DEFAULTS.person : options.person
    };

    return result;
};