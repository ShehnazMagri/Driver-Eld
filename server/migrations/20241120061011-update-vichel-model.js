module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Vichels', 'vehicleModel', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Vichels', 'license', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Vichels', 'fuelType', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Vichels', 'registrationExpiryDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('Vichels', 'registrationNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Vichels', 'vehicleModel', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Vichels', 'license', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Vichels', 'fuelType', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Vichels', 'registrationExpiryDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('Vichels', 'registrationNumber', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};