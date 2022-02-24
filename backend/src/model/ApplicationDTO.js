'use strict';

const AvailabilityDTO = require("./AvailabilityDTO");
const CompetenceProfileDTO = require("./CompetenceProfileDTO");

/**
 * The ApplicationDTO, representing a person's application.
 */
class ApplicationDTO {

    /**
     * The constructor of ApplicationDTO.
     * 
     * @param {String} username The username of the person applying. 
     * @param {Array} Competences The competences of the person e.g { id: 3, experience: 3 }.
     * @param {Array} Availabilities The work periods the person is available.
     */
    constructor(username, competences, availabilities) {
        this.username = username;
        this.competences = competences.map((comp) => new CompetenceProfileDTO(comp.id, comp.experience));
        this.availabilities = availabilities.map((avail) => new AvailabilityDTO(avail.from, avail.to));
    }
}

module.exports = ApplicationDTO;