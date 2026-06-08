"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("enquires", "agentId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      after: "propertyId",
    });

    await queryInterface.sequelize.query(`
      UPDATE enquires
      SET agentId = (
        SELECT properties.agentId
        FROM properties
        WHERE properties.id = enquires.propertyId
      )
      WHERE agentId IS NULL
    `);

    await queryInterface.addIndex("enquires", ["agentId"], {
      name: "enquires_agent_id_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("enquires", "enquires_agent_id_idx");
    await queryInterface.removeColumn("enquires", "agentId");
  },
};
