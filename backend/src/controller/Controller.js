'use strict';

const RecruitmentDAO = require('../integration/RecruitmentDAO');
const bcrypt = require('bcrypt');
const PersonDTO = require('../model/PersonDTO');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

/**
 * Controller class. This class is responsible of calling 
 * the model and integration layers.
 * 
 */
class Controller {

    /**
     * Creates an instance and connects to the database.
     */
    constructor() {
        this.recruitmentDAO = new RecruitmentDAO();
        this.transactionManager = this.recruitmentDAO.getTransactionManager();
    }

    /**
     * Creates the controller.
     * 
     * @returns {Controller} The controller.
     */
    static async createController() {
        const contr = new Controller();
        return contr;
    }

    /**
     * Create a person by calling RecruitmentDAO and passing the parameter person
     * with its hashed password.
     * 
     * @param {PersonDTO} person The person to store in the database.
     * @returns {PersonDTO} The created person.
     */
    async createPerson(person) {
        return this.transactionManager.transaction(async (t) => {
            const hashedPassword = await bcrypt.hash(person.password, saltRounds);
            const p = new PersonDTO(person.personId, person.name, person.surname, person.pnr, person.email, hashedPassword, person.roleId, person.username);
            return await this.recruitmentDAO.createPerson(p);
        });
    }

    /**
     * Checks if a username is available in the database.
     * 
     * @param {String} username The username to check if it is available.
     * @returns {Boolean} True if username is available or False if username is not available.
     */
    async isUsernameAvailable(username) {
        return this.transactionManager.transaction(async () => {
            const person = await this.recruitmentDAO.findPersonByUsername(username);
            if(person) {
                return false;
            }
            return true;
        });
    }

    /**
     * Checks if the given username exists in the database. If the username exists
     * checks that the given password matches the password for this person in the db.
     * 
     * @param {String} username: The username entered when signing in.
     * @param {String} password: The password entered when signing in.
     * @returns {personDTO} The signed in person if sign in is successful, or
     * null if the username or the password is wrong (failed sign in).
     */
    async signin(username, password) {
        return this.transactionManager.transaction(async (t) => {
            const person = await this.recruitmentDAO.findPersonByUsername(username);

            if(person) {
                let correctPassword;

                correctPassword = await bcrypt.compare(password, person.password).then(function(result) {
                    return result;
                });
                
                if(correctPassword) {
                    return person;
                }
            } else {
                return null;
            }
        });
    }

    /**
     * Fetches all competences from the database.
     * 
     * @returns {Array} The competenceDTOs
     */
    async getAllCompetences() {
        return this.transactionManager.transaction(async (t) => {
            return await this.recruitmentDAO.getAllCompetences();
        });
    }

    /**
     * Stores the application data in the database.
     * 
     * @param {ApplicationDTO} applicationDTO The application data to store.
     */
    async addApplication(applicationDTO) {
        return this.transactionManager.transaction(async (t) => {
            return await this.recruitmentDAO.addApplication(applicationDTO);
        });
    }
}

module.exports = Controller;