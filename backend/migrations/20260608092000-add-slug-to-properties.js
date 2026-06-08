"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("properties", "slug", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addIndex("properties", ["slug"], {
      name: "properties_slug_index",
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("properties", "properties_slug_index");
    await queryInterface.removeColumn("properties", "slug");
  },
};
