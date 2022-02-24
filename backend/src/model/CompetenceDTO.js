'use strict';

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
        this.id = id;
        this.name = name;
    }
}

module.exports = CompetenceDTO;