"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      this.belongsTo(models.projectCategoryModel, {
        foreignKey: "projectCategoryId",
        as: "category",
      });

      this.hasMany(models.projectMediaModel, {
        foreignKey: "projectId",
        as: "images",
      });
    }
  }

  Projects.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Projects",
      tableName: "projects",
    },
  );

  return Projects;
};
