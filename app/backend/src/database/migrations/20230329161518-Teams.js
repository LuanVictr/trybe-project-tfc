'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('teams', {
    id: {
      primaryKey:true,
      allowNull:false,
      autoIncrement:true,
      type: Sequelize.INTEGER,
    },
    teamName: {
      field:'team_name',
      allowNull:false,
      type: Sequelize.STRING,
    },
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
