"use strict";

const employee = require("../models/employee");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("time_table_header", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      heading: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_heading: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "employees", // Matches the table name of the Employee model
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      img_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      img_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("time_table_header");
  },
};
