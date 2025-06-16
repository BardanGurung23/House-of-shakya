"use strict";
const { GENDER, REGISTRATION_METHOD } = require("../constants/value-constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "supervisorId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "supervisorId");
  },
};
