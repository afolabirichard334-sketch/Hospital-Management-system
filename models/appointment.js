'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Patient, {
        foreignKey: 'PatientId',
        as:'Patients',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })

       Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctorId',
        as:'Doctors',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Appointment.init({
          id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      AppointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      AppointmentTime: {
        type: DataTypes.TIME,
        allowNull:false
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled')
      },
      reason: {
        type: DataTypes.STRING,
        allowNull:false
      },
      doctorId: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
          model: 'Doctors',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      patientId: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
          model: 'Patients',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'Appointments'
  });
  return Appointment;
};