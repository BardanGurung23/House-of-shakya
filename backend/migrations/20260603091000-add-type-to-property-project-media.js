"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("property_media", "type", {
      type: Sequelize.ENUM("image", "video"),
      allowNull: false,
      defaultValue: "image",
    });

    await queryInterface.addColumn("project_media", "type", {
      type: Sequelize.ENUM("image", "video"),
      allowNull: false,
      defaultValue: "image",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("project_media", "type");
    await queryInterface.removeColumn("property_media", "type");
  },
};
