'use strict';

var defaultConfigFactory = require( './lib/ogrn-config.js' );
var ogrnFactory = require( './lib/ogrn.js' );

module.exports = function ( defaultConfigOptions, config ) {

    config = config || defaultConfigFactory( defaultConfigOptions );

    return ogrnFactory( config );

};