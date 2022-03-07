'use strict';

const { Model, DataTypes } = require('sequelize');
const Person = require('./Person');

/**
 * This class represents an availability period.
 */
class Availability extends Model {

    /**
     * The name of the Availability model.
     */
     static get AVAILABILITY_MODEL_NAME() {
        return 'availability';
    }

    /**
     * Defines the Availability Entity.
     * Foreign key person_id to a Person Entity.
     * 
     * @param {Sequelize} sequelize The database object.
     * @returns {Model} The sequelize model of the Availability Entity.
     */
    static createModel(sequelize) {
        Availability.init({
            availability_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            from_date: {
                type: DataTypes.DATEONLY,
            },
            to_date: {
                type: DataTypes.DATEONLY,
            }
        },
        {
            sequelize, 
            modelName: Availability.AVAILABILITY_MODEL_NAME, 
            paranoid: false, 
            freezeTableName: true, 
            timestamps: false
        });
        Availability.belongsTo(Person, { foreignKey: 'person_id' });
        return Availability;
    }
}

module.exports = Availability;
