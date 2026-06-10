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
  async up(queryInterface) {
    const table = await queryInterface.describeTable("team_members");

    if (!table.userId) {
      return;
    }

    await removeForeignKeysForColumn(queryInterface, "team_members", "userId");
    await queryInterface.removeColumn("team_members", "userId");
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("team_members");

    if (table.userId) {
      return;
    }

    await queryInterface.addColumn("team_members", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
};
