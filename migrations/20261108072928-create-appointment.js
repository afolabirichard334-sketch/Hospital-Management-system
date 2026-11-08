'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      AppointmentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      AppointmentTime: {
        type: Sequelize.TIME,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'cancelled')
      },
      reason: {
        type:Sequelize.STRING,
        allowNull:false
      },
      doctorId: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Doctors',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      patientId: {
        type: Sequelize.UUID,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};