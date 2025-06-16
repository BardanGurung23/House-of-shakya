"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the `position` column from the `time_table` table
    await queryInterface.removeColumn("time_table", "position");
  },

  down: async (queryInterface, Sequelize) => {
    // Add the `position` column back to the `time_table` table
    await queryInterface.addColumn("time_table", "position", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true, // Restore the original constraint if needed
    });
  },
};
