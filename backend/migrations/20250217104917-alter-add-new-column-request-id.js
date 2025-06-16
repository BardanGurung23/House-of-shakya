"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the 'slug' column to the 'employees' table
    await queryInterface.addColumn("notifications", "request_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'slug' column from the 'employees' table
    await queryInterface.removeColumn("notifications", "request_id");
  },
};
