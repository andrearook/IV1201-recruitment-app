'use strict';

const {Sequelize, Model, DataTypes} = require('sequelize');

/**
 * The Competence class representing one professional competence
 */
class Competence extends Model {

    /**
     * The name of the Competence model
     */
    static get COMPETENCE_MODEL_NAME() {
        return 'competence';
    }

    /**
     * Defines the Competence Entity
     * 
     * @param {Sequelize} sequelize Object
     * @returns {Model} The sequelize model of the Competence Entity
     */
    static createModel(sequelize) {
        Competence.init({
            competence_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
            },
        },
        {
            sequelize, 
            modelName: Competence.COMPETENCE_MODEL_NAME, 
            paranoid: false, 
            freezeTableName: true, 
            timestamps: false
        });
        return Competence;
    }
}

module.exports = Competence;