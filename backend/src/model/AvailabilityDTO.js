'use strict';

const Validation = require("../util/Validation");

/**
 * The AvailabilityDTO class representing an availability period.
 */
class AvailabilityDTO {

    /**
     * The constructor of AvailabilityDTO.
     * 
     * @param {String} fromDate The date the availability period starts.
     * @param {String} toDate The date the availability period ends.
     */
    constructor(fromDate, toDate) {
        Validation.isDateString(fromDate, 'fromDate');
        Validation.isDateString(toDate, 'toDate');
        this.from_date = fromDate;
        this.to_date = toDate;
    }
}

module.exports = AvailabilityDTO;