'use strict';

const Validation = require("../util/Validation");

/**
 * The CompetenceDTO class representing a competence.
 */
class CompetenceDTO {

    /**
     * The constructor of CompetenceDTO.
     * 
     * @param {Integer} id The id of the newly created competence. 
     * @param {String} name The name of the competence, e.g. ticket sales.
     */
    constructor(id, name) {
        Validation.isPositiveInteger(id, 'id');
        Validation.isNotEmptyString(name, 'name');
        this.id = id;
        this.name = name;
    }
}

module.exports = CompetenceDTO;