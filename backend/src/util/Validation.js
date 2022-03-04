'use strict';

const assert = require('assert').strict;
const validator = require('validator');

/**
 * A class with static methods for validation. The class was written to gather the
 * validation methods in one place, and make them easy to utilize.
 */
class Validation {

    /**
     * Checks that the value is a number.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isNumber(val, name) {
        assert.equal(typeof val, 'number', `${name} must be a number`);
    }

    /**
     * Checks that the value is an integer.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isInteger(val, name) {
        Validation.isNumber(val, name);
        assert(!Number.isNaN(val) && Number.isInteger(val), `${name} must be an integer`);
    }

    /**
     * Checks that the value is an integer larger than zero.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isPositiveInteger(val, name) {
        Validation.isInteger(val, name);
        assert(val > 0, `${name} must be larger than zero.`);
    }

    /**
     * Checks that the value is a number larger than zero.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isPositiveNumber(val, name) {
        Validation.isNumber(val, name);
        assert(val > 0, `${name} must be larger than zero.`);
    }

    /**
     * Checks that the value is a string.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isString(val, name) {
        assert.equal(typeof val, 'string', `${name} must be a string`);
    }

    /**
     * Checks that the value is a string and not empty.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isNotEmptyString(val, name) {
        Validation.isString(val, name);
        assert(!validator.isEmpty(val), `${name} must not be an empty string`);
    }

    /**
     * Checks that the value is an alphabetic string.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isAlphaString(val, name) {
        Validation.isNotEmptyString(val, name);
        assert(validator.isAlpha(val), `${name} must only consist of letters`);
    }

    /**
     * Checks that the value is an alphanumeric string.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isAlphaNumericString(val, name) {
        Validation.isNotEmptyString(val, name);
        assert(validator.isAlphanumeric(val), `${name} must be an alphanumeric string`);
    }

    /**
     * Checks that the value is a valid id, either an int larger than zero or a string 
     * representing an int larger than zero.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isValidId(val, name) {
        if(typeof val === 'string') {
            assert(validator.isInt(val, { min: 1 }), `${name} must be a string of int larger than zero`);
        } else if(typeof val === 'number') {
            Validation.isPositiveInteger(val, name);
        } else {
            assert.fail(`${name} must be int larger than zero or string of int larger than zero`);
        }
    }

    /**
     * Checks that the value is a valid id (either an int larger than zero or a string 
     * representing an int larger than zero) or is undefined.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isValidIdOrNothing(val, name) {
        if(typeof val === 'string') {
            assert(validator.isInt(val, { min: 1 }), `${name} must be string of int larger than zero`);
        } else if(typeof val === 'number') {
            Validation.isPositiveInteger(val, name);
        } else if (val === undefined){
            return;
        } else {
            assert.fail(`${name} must be int larger than zero or string of int larger than zero, or undefined`);
        }
    }

    /**
     * Checks that the value is a valid experience, either a number larger than zero or a string 
     * representing a number larger than zero.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isValidExperience(val, name) {
        if(typeof val === 'string') {
            assert(validator.isNumeric(val, { min: 0 }), `${name} must be string of number larger than zero`);
        } else if(typeof val === 'number') {
            Validation.isPositiveNumber(val, name);
        } else {
            assert.fail(`${name} must be number larger than zero or string of number larger than zero`);
        }
    }

    /**
     * Checks that the value is an string of an actual date, and on format YYYY-MM-DD.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isDateString(val, name) {
        Validation.isNotEmptyString(val, name);
        assert(validator.isISO8601(val, {strict: true}), `${name} must be an actual date`);
        assert(validator.isDate(val, {format: 'YYYY-MM-DD', strictMode: true}), `${name} must be on format YYYY-MM-DD`);
    }

    /**
     * Checks that the value is an string representing an email, or nothing.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isEmailOrNothing(val, name) {
        if(typeof val === 'string') {
            Validation.isNotEmptyString(val, name);
            assert(validator.isEmail(val), `${name} must be an email`);
        } else if(val === undefined || val === null) {
            return;
        } else {
            assert.fail(`${name} must be an email or nothing`);
        }  
    }

    /**
     * Checks that the value is an string representing a personal number, or nothing.
     * 
     * @param {any} val The value which will be checked.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isPersonNumberOrNothing(val, name) {
        if(typeof val === 'string') {
            Validation.isNotEmptyString(val, name);
            assert(validator.isNumeric(val) && validator.isLength(val, {min: 10, max: 10}), `${name} must be 10 numbers`);
        } else if(val === undefined || val === null) {
            return;
        } else {
            assert.fail(`${name} must be a personnumber or nothing`);
        } 
    }

    /**
     * Checks that the value is an instance of a given class.
     * 
     * @param {any} val The value which will be checked.
     * @param {any} reqClass The class the value is checked to be an instance of.
     * @param {String} name The name of the value, for inclusion in error message on fail.
     * @param {String} className The name of desired class, for inclusion in error message on fail.
     * @throws {AssertionError} If the validation fails.
     */
    static isInstanceOf(val, reqClass, name, className) {
        assert(val instanceof reqClass, `${name} must be an instance of ${className}`);
    }
}

module.exports = Validation;