'use strict';

const { Model, DataTypes} = require('sequelize');
const Competence = require('./Competence');
const Person = require('./Person');

/**
 * The CompetenceProfile class holding the information about the
 * person's competence id and experience in years.
 */
class CompetenceProfile extends Model {

    /**
     * The name of the CompetenceProfile model.
     */
    static get COMPETENCE_PROFILE_MODEL_NAME() {
        return 'competence_profile';
    }

    /**
     * Defines the CompetenceProfile Entity.
     * Foreign key person_id to a Person Entity.
     * Foreign key competence_id to a Competence Entity.
     * 
     * @param {Sequelize} sequelize The database object.
     * @returns {Model} The sequelize model of the CompetenceProfile Entity.
     */
    static createModel(sequelize) {
        CompetenceProfile.init({
            competence_profile_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            years_of_experience: {
                type: DataTypes.DECIMAL(4,2),
            },
        },
        {
            sequelize, 
            modelName: CompetenceProfile.COMPETENCE_PROFILE_MODEL_NAME, 
            paranoid: false, 
            freezeTableName: true, 
            timestamps: false
        });
        CompetenceProfile.belongsTo(Person, { foreignKey: 'person_id' });
        CompetenceProfile.belongsTo(Competence, { foreignKey: 'competence_id' });
        return CompetenceProfile;
    }
}

module.exports = CompetenceProfile;