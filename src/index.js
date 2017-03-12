'use strict';

const defaultConfigFactory = require( './lib/ogrn-config.js' );
const ogrnFactory = require( './lib/ogrn.js' );

module.exports = function ( defaultConfigOptions, config ) {

    config = config || defaultConfigFactory( defaultConfigOptions );

    return ogrnFactory( config );

};