"use strict";

const removeForeignKeysForColumn = async (
  queryInterface,
  tableName,
  columnName,
) => {
  const foreignKeys =
    await queryInterface.getForeignKeyReferencesForTable(tableName);
  const columnForeignKeys = foreignKeys.filter((foreignKey) => {
    return (
      foreignKey.columnName === columnName ||
      foreignKey.column_name === columnName
    );
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

    await queryInterface.addColumn("properties", "problem", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("properties", "solution", {
      type: Sequelize.TEXT,
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

    await queryInterface.addColumn("properties", "googleMapURL", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addIndex("properties", ["agentId"], {
      name: "properties_agent_id_index",
    });
  },

  async down(queryInterface) {
    await removeForeignKeysForColumn(queryInterface, "properties", "agentId");
    await queryInterface.removeIndex("properties", "properties_agent_id_index");
    await queryInterface.removeColumn("properties", "googleMapURL");
    await queryInterface.removeColumn("properties", "completionDate");
    await queryInterface.removeColumn("properties", "yearBuilt");
    await queryInterface.removeColumn("properties", "view");
    await queryInterface.removeColumn("properties", "parking");
    await queryInterface.removeColumn("properties", "size");
    await queryInterface.removeColumn("properties", "problem");
    await queryInterface.removeColumn("properties", "solution");
    await queryInterface.removeColumn("properties", "description");
    await queryInterface.removeColumn("properties", "agentId");
  },
};
