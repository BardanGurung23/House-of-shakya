"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("properties", "agentId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("properties", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "overview", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "size", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "parking", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "view", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "yearBuilt", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "completionDate", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "latitude", {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "longitude", {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    });

    await queryInterface.addColumn("properties", "googleMapURL", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addIndex("properties", ["agentId"], {
      name: "properties_agent_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("properties", "properties_agent_id_index");
    await queryInterface.removeColumn("properties", "googleMapURL");
    await queryInterface.removeColumn("properties", "longitude");
    await queryInterface.removeColumn("properties", "latitude");
    await queryInterface.removeColumn("properties", "completionDate");
    await queryInterface.removeColumn("properties", "yearBuilt");
    await queryInterface.removeColumn("properties", "view");
    await queryInterface.removeColumn("properties", "parking");
    await queryInterface.removeColumn("properties", "size");
    await queryInterface.removeColumn("properties", "address");
    await queryInterface.removeColumn("properties", "overview");
    await queryInterface.removeColumn("properties", "description");
    await queryInterface.removeColumn("properties", "agentId");
  },
};
