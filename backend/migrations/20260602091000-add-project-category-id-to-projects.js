"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("projects", "projectCategoryId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "project_categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("projects", "projectCategoryId");
  },
};
