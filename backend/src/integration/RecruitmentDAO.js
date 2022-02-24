'use strict';

const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const WError = require('verror').WError;

const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');
const Competence = require('../model/Competence');
const CompetenceDTO = require('../model/CompetenceDTO');
const Availability = require('../model/Availability');
const CompetenceProfile = require('../model/CompetenceProfile');

/**
 * RecruitmentDAO class is responsible for all database calls.
 * 
 */
class RecruitmentDAO {

    /**
     * Constructor of RecruitmentDAO.
     * 
     * Setup the connection to the database.
     * If running Heroku NODE_ENV will be in production, and the database configs will be
     * fetched from Heroku. Otherwise the config for the database will be fetched from .env.
     */
    constructor() {
        const namespace = cls.createNamespace('recruitment_db');
        Sequelize.useCLS(namespace);
        if(process.env.NODE_ENV === "production") {
            this.database = new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres',
                dialectOptions: {
                   ssl: {
                       require: true,
                       rejectUnauthorized: false
                   }
               }
            });
        } else {
            this.database = new Sequelize(
               process.env.DB_NAME,
               process.env.DB_USER,
               process.env.DB_PASS,
               {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT},   
           );
        }
        Person.createModel(this.database);
        Competence.createModel(this.database);
        Availability.createModel(this.database);
        CompetenceProfile.createModel(this.database);
    }

    /**
     * Will return the database object.
     * 
     * @return {Object} The sequelize transaction manager.
     */
    getTransactionManager() {
        return this.database;
    }

    /**
     * Finds a person in the database by calling Sequelize's method findOne()
     * while passing the parameter username.
     * 
     * @param {String} username The username of the person to find.
     * @returns {PersonDTO} The found person or null if not found.
     * @throws Throws an exception if the person could not be found.
     */
    async findPersonByUsername(username) {
        try {
            const person = await Person.findOne({
                where: {username: username},
            }); 
            if(person) {
                return this.createPersonDTO(person, person.role_id);
            }
            return null;
        } catch(err) {
            throw new WError(
                {
                    cause: err,
                    info: {
                        RecruitmentDAO: 'Failed to find person in database.',
                        username: username,
                    },
                },
                'Could not find person with username ${username}.',
            );
        }
    }

    /**
     * Creates a person in the database by passing the parameter personDTO
     * to Sequelize's method create().
     * 
     * @param {PersonDTO} personDTO The person to store.
     * @returns {PersonDTO} The created person.
     * @throws Throws an exception if the person could not be created.
     */
    async createPerson(personDTO) {
        try {
            const person = await Person.create(personDTO);
            return this.createPersonDTO(person, 2);
        } catch(err) {
            throw new WError(
                {
                    cause: err,
                    info: {
                        RecruitmentDAO: 'Failed to create person in database.',
                        name: personDTO.name,
                        surname: personDTO.surname,
                    },
                },
                'Could not create person ${personDTO.name} ${personDTO.surname}.',
            );
        }
    }

    /**
     * Fetches and returns all competences.
     * 
     * @returns {Array} The found competences.
     */
    async getAllCompetences() {
        try {
            const competences = await Competence.findAll();
            return competences.map((comp) => this.createCompetenceDTO(comp));
        } catch(err) {
            throw new WError(
                {
                    cause: err,
                    info: {
                        RecruitmentDAO: 'Failed to fetch competences',
                    },
                },
                'Could not fetch competences',
            );
        }
    }

    /**
     * Stores the data from the applicationDTO in the database.
     * 
     * @param {ApplicationDTO} applicationDTO The data to be stored. Should contain
     *                                        username, competence profiles and availabilities.
     */
    async addApplication(applicationDTO) {
        try {
            // Find the person that the application should belong to
            const personModel = await Person.findOne({
                where: {username: applicationDTO.username},
            }); 

            const availabilities = applicationDTO.availabilities;
            const compProfiles = applicationDTO.competences;

            // Store each availability, and set the foreign key to person 
            for(let i = 0; i < availabilities.length; i++) {
                const availModel = await Availability.create(availabilities[i]);
                await availModel.setPerson(personModel);
            }

            // Store each competence profile, and set the foreign key to person
            // Foreign key to competence is already included in each CompetenceProfileDTO
            for(let i = 0; i < compProfiles.length; i++) {
                const compProfModel = await CompetenceProfile.create(compProfiles[i]);
                await compProfModel.setPerson(personModel);
            }
        } catch(err) {
            throw new WError(
                {
                    cause: err,
                    info: {
                        RecruitmentDAO: 'Failed to store application',
                    },
                },
                'Could not store application',
            );
        }
    }

    /**
     * Creates a PersonDTO.
     * 
     * @param {Person} personModel The person to be created.  
     * @param {int} roleId: The role id for the personDTO to be created.
     * @returns {PersonDTO} The created person.
     */
    createPersonDTO(personModel, roleId) {
        return new PersonDTO(
            personModel.person_id,
            personModel.name,
            personModel.surname,
            personModel.pnr,
            personModel.email,
            personModel.password,
            roleId,
            personModel.username,
        );
    }

    /**
     * Creates a CompetenceDTO
     * 
     * @param {Competence} competence The competence, e.g ticket sales.
     * @returns {CompetenceDTO} The created competence.
     */
    createCompetenceDTO(competence) {
        return new CompetenceDTO(
            competence.competence_id,
            competence.name,
        );
    }
}

module.exports = RecruitmentDAO;