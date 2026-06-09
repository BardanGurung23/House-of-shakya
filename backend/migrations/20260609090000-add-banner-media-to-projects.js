"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("projects", "bannerMedia", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "img",
    });

    await queryInterface.addColumn("projects", "bannerMediaType", {
      type: Sequelize.ENUM("image", "video"),
      allowNull: true,
      after: "bannerMedia",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("projects", "bannerMediaType");
    await queryInterface.removeColumn("projects", "bannerMedia");
  },
};
