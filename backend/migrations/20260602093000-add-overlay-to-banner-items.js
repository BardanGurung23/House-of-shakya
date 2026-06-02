"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("banner_items", "overlayColor", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "#00152f",
    });
    await queryInterface.addColumn("banner_items", "overlayOpacity", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.45,
    });
    await queryInterface.addColumn("banner_items", "overlayDirection", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "to right",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("banner_items", "overlayDirection");
    await queryInterface.removeColumn("banner_items", "overlayOpacity");
    await queryInterface.removeColumn("banner_items", "overlayColor");
  },
};
