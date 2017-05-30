'use strict';
module.exports = {
    getInnFirstCheck    : getInnFirstCheck      ,
    getInnSecondCheck   : getInnSecondCheck     ,
    getRandomElement    : getRandomElement      ,
    checkValidation     : checkValidation
};
/**
 * for getting first digit of control sum
 * https://ru.wikipedia.org/wiki/%D0%98%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80_%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%89%D0%B8%D0%BA%D0%B0
 * @param   {String}    str     string of 10 digits
 * @returns {number}            one digit number
 */
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
/**
 * for getting second digit of control sum
 * https://ru.wikipedia.org/wiki/%D0%98%D0%B4%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9_%D0%BD%D0%BE%D0%BC%D0%B5%D1%80_%D0%BD%D0%B0%D0%BB%D0%BE%D0%B3%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%89%D0%B8%D0%BA%D0%B0
 * @param   {String}    str     string of 11 digits
 * @returns {number}            one digit number
 */
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

/**
 * @param   {Array}     array   array of any elements
 * @returns {*}                 element of array picked randomly
 */
function getRandomElement ( array ) {
    return array[ Math.floor( Math.random() * array.length ) ];
}

/**
 * @param  {Object}  validation     Object with boolean props
 * @return {Boolean}                True if all props are true
 */
function checkValidation ( validation ) {
    return Object.keys( validation ).every( key => validation[ key ] );
}
