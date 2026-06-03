"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("banner_items", "type", {
      type: Sequelize.ENUM("image", "video"),
      allowNull: false,
      defaultValue: "image",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("banner_items", "type");
  },
};
