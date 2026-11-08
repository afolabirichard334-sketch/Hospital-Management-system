'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
       
        primaryKey: true,
        type: Sequelize.UUID
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull : false
      },
      lastName: {
       type: Sequelize.STRING,
        allowNull : false
      },
      email: {
       type: Sequelize.STRING,
        allowNull : false
      },
      dateOfBirth: {
       type: Sequelize.STRING,
        allowNull : false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull : false
      },
      bloodType: {
        type: Sequelize.STRING,
        allowNull : false
      },
      height: {
        type: Sequelize.STRING,
        allowNull : false
      },
      weight: {
        type: Sequelize.STRING,
        allowNull : false
      },
      chronic_condition: {
        type: Sequelize.STRING,
        allowNull : false
      },
      allergies: {
        type: Sequelize.STRING,
        allowNull : false
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
    await queryInterface.dropTable('Patients');
  }
};