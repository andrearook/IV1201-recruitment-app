'use strict';

const {Sequelize, Model, DataTypes} = require('sequelize');
const Competence = require('./Competence');

/**
 * The Competence class representing one competence in a specific language.
 */
class CompetenceName extends Model {

    /**
     * The name of the Competence model.
     */
    static get COMPETENCE_NAME_MODEL_NAME() {
        return 'competence_name';
    }

    /**
     * Defines the Competence Name Entity.
     * 
     * @param {Sequelize} sequelize The database object.
     * @returns {Model} The sequelize model of the Competence Name Entity.
     */
    static createModel(sequelize) {
        CompetenceName.init({
            competence_name_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            language: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
        },
        {
            sequelize, 
            modelName: CompetenceName.COMPETENCE_NAME_MODEL_NAME, 
            paranoid: false, 
            freezeTableName: true, 
            timestamps: false
        });
        CompetenceName.belongsTo(Competence, { foreignKey: 'competence_id' });
        return CompetenceName;
    }
}

module.exports = CompetenceName;