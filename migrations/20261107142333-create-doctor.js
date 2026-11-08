'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      firstName: {
        allowNull:false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING,
        unique:true
      },
      phoneNumber: {
        allowNull:false,
        type: Sequelize.STRING
      },
      specialization: {
        allowNull:false,
        type: Sequelize.STRING
      },
      qualification: {
        allowNull:false,
        type: Sequelize.STRING
      },
      experience: {
        allowNull:false,
        type: Sequelize.STRING
      },
      departmentId: {
        allowNull:false,
        type: Sequelize.UUID,
        references: {
          model: "Departments",
          key: "id"
        } ,
        OnUpdate: 'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('Doctors');
  }
};