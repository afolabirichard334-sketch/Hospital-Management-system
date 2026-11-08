'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.Department, {
        foreignKey: "departmentId",
        as: "department"
      })

      Doctor.hasMany(models.Appointment, {
        foreignKey: 'doctorId',
        as: 'Appointments',
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      })
    }
  }
  Doctor.init({
        id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        allowNull:false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull:false,
        type: DataTypes.STRING
      },
      email: {
        allowNull:false,
        type: DataTypes.STRING,
        unique:true
      },
      phoneNumber: {
        allowNull:false,
        type:DataTypes.STRING
      },
      specialization: {
        allowNull:false,
        type: DataTypes.STRING
      },
      qualification: {
        allowNull:false,
        type: DataTypes.STRING
      },
      experience: {
        allowNull:false,
        type: DataTypes.STRING
      },
      departmentId: {
        allowNull:false,
        type: DataTypes.UUID,
        references: {
          model: "Departments",
          key: "id"
        } ,
        OnUpdate: 'CASCADE',
        onDelete:'CASCADE'
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
    modelName: 'Doctor',
    tableName: 'Doctors',
    timestamps: true
  });
  return Doctor;
};