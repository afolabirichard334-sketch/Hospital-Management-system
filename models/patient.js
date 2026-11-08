'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed in the future
      Patient.hasMany(models.Appointment, {
        foreignKey: 'patientId',
        as: 'Appointments',
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      })
    }
  }
  
  Patient.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chronic_condition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize, 
    modelName: 'Patient',
    tableName: 'Patients'
  });
  
  return Patient;
};
