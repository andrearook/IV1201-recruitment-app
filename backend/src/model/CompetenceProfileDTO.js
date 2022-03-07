'use strict';

const Validation = require("../util/Validation");


/**
 * The Competence Profile DTO, representing a competence profile.
 */
class CompetenceProfileDTO {

    /**
     * The constructor of CompetenceProfileDTO.
     * 
     * @param {Integer} id The id of the competence, e.g. ticket sales. 
     * @param {Double} experience The experience in years, e.g. 0.2 years.
     */
    constructor(id, experience) {
        Validation.isValidId(id, 'id');
        Validation.isValidExperience(experience, 'experience');
        this.competence_id = id;
        this.years_of_experience = experience;
    }
}

module.exports = CompetenceProfileDTO;