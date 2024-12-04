'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vichels', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vehicleType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      truckType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vehicleNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      vehicleModel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fuelTankCapacity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      terminalAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hoursAvailablePerDay: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      dormancyThreshold: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      registrationNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      registrationExpiryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      liabilityInsuranceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      liabilityInsuranceNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      liabilityInsuranceExpiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cargoInsuranceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cargoInsuranceNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cargoInsuranceExpiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fuelType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      license: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ownerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assignedDriverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vichels');
  }
};
