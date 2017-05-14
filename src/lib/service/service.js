'use strict';

function getInnFirstCheck ( str ) {
    return (
        7  * str[ 0 ] +
        2  * str[ 1 ] +
        4  * str[ 2 ] +
        10 * str[ 3 ] +
        3  * str[ 4 ] +
        5  * str[ 5 ] +
        9  * str[ 6 ] +
        4  * str[ 7 ] +
        6  * str[ 8 ] +
        8  * str[ 9 ]
    ) % 11 % 10;
}

function getInnSecondCheck ( str ) {
    return (
        3  * str[ 0 ] +
        7  * str[ 1 ] +
        2  * str[ 2 ] +
        4  * str[ 3 ] +
        10 * str[ 4 ] +
        3  * str[ 5 ] +
        5  * str[ 6 ] +
        9  * str[ 7 ] +
        4  * str[ 8 ] +
        6  * str[ 9 ] +
        8  * str[ 10 ]
    ) % 11 % 10;
}

module.exports = {
    getInnFirstCheck    : getInnFirstCheck,
    getInnSecondCheck   : getInnSecondCheck
};