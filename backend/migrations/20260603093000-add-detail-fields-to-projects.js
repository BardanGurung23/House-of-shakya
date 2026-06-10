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

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("projects", "agentId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("projects", "slug", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "overview", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "price", {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "status", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "size", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "bedrooms", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "bathrooms", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "parking", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "view", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "yearBuilt", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "completionDate", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "latitude", {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    });
    await queryInterface.addColumn("projects", "longitude", {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    });

    await queryInterface.addIndex("projects", ["slug"], {
      name: "projects_slug_index",
    });
    await queryInterface.addIndex("projects", ["agentId"], {
      name: "projects_agent_id_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await removeForeignKeysForColumn(queryInterface, "projects", "agentId");
    await queryInterface.removeIndex("projects", "projects_agent_id_index");
    await queryInterface.removeIndex("projects", "projects_slug_index");
    await queryInterface.removeColumn("projects", "longitude");
    await queryInterface.removeColumn("projects", "latitude");
    await queryInterface.removeColumn("projects", "completionDate");
    await queryInterface.removeColumn("projects", "yearBuilt");
    await queryInterface.removeColumn("projects", "view");
    await queryInterface.removeColumn("projects", "parking");
    await queryInterface.removeColumn("projects", "bathrooms");
    await queryInterface.removeColumn("projects", "bedrooms");
    await queryInterface.removeColumn("projects", "size");
    await queryInterface.removeColumn("projects", "status");
    await queryInterface.removeColumn("projects", "price");
    await queryInterface.removeColumn("projects", "address");
    await queryInterface.removeColumn("projects", "overview");
    await queryInterface.removeColumn("projects", "slug");
    await queryInterface.removeColumn("projects", "agentId");
  },
};
