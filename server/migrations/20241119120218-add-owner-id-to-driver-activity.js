'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DriverActivities', 'ownerId', {
      type: Sequelize.INTEGER,
      allowNull: false, // Or true, depending on your requirements
     
    
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('DriverActivities', 'ownerId');
  },
};
