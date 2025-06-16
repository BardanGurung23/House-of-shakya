"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "loginAttemptsCount");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "loginAttemptsCount", {
      type: Sequelize.INTEGER,
      defaultValue: 5,
    });
  },
};
