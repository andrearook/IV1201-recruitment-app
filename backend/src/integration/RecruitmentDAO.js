'use strict';

const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const WError = require('verror').WError;
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');

/**
 * RecruitmentDAO class is responsible for all database calls.
 * 
 */
class RecruitmentDAO {

    /**
     * Constructor of RecruitmentDAO
     * Setup the connection to the database.
     */
    constructor() {
        const namespace = cls.createNamespace('recruitment_db');
        Sequelize.useCLS(namespace);
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT},   
        );
        Person.createModel(this.database);
    }

    /**
     * The database object
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
     * @param {String} username
     * @returns {PersonDTO} The found person or null if not found.
     * @throws Throws an exception if the person could not be found.
     */
    async findPersonByUsername(username) {
        try {
            const person = await Person.findOne({
                where: {username: username},
            }); 
            if(person) {
                return this.createPersonDTO(person);
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
     * @param {PersonDTO} personDTO 
     * @returns {PersonDTO} The created person
     * @throws Throws an exception if the person could not be created.
     */
    async createPerson(personDTO) {
        try {
            const person = await Person.create(personDTO);
            return this.createPersonDTO(person);
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
     * Creates a PersonDTO
     * 
     * @param {Person} personModel 
     * @returns {PersonDTO} The created person
     */
    createPersonDTO(personModel) {
        return new PersonDTO(
            personModel.person_id,
            personModel.name,
            personModel.surname,
            personModel.pnr,
            personModel.email,
            personModel.password,
            personModel.roleId,
            personModel.username,
        );
    }
}

module.exports = RecruitmentDAO;