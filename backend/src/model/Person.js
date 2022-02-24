'use strict';

const {Sequelize, Model, DataTypes} = require('sequelize');

/**
 * A person of the Recruitment App.
 */
class Person extends Model {

    /**
     * The name of the Person model.
     */
    static get PERSON_MODEL_NAME() {
        return 'person';
    }

    /**
     * Defines the Person Entity.
     * 
     * @param {Sequelize} sequelize The database object.
     * @returns {Model} The sequelize model of the Person Entity.
     */
    static createModel(sequelize) {
        Person.init({
            person_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
            },
            surname: {
                type: Sequelize.STRING,
            },
            pnr: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            role_id: {
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
            },
        },
        {
            sequelize, 
            modelName: Person.PERSON_MODEL_NAME, 
            paranoid: false, 
            freezeTableName: true, 
            timestamps: false
        });
        return Person;
    }
}

module.exports = Person;