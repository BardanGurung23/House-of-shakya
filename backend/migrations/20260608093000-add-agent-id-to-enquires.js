"use strict";

const removeForeignKeysForColumn = async (queryInterface, tableName, columnName) => {
  const foreignKeys = await queryInterface.getForeignKeyReferencesForTable(tableName);
  const columnForeignKeys = foreignKeys.filter((foreignKey) => {
    return foreignKey.columnName === columnName || foreignKey.column_name === columnName;
  });

  for (const foreignKey of columnForeignKeys) {
    await queryInterface.removeConstraint(
      tableName,
      foreignKey.constraintName || foreignKey.constraint_name,
    );
  }
};

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
    await removeForeignKeysForColumn(queryInterface, "enquires", "agentId");
    await queryInterface.removeIndex("enquires", "enquires_agent_id_idx");
    await queryInterface.removeColumn("enquires", "agentId");
  },
};
