"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("project_media", "caption", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("project_media", "sortOrder", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("project_media", "sortOrder");
    await queryInterface.removeColumn("project_media", "caption");
  },
};
