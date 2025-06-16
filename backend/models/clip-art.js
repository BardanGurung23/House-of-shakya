"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClipArt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // has many employee  late do--

      this.belongsTo(models.departmentModel, {
        foreignKey: "departmentId",
      });
    }
  }

  ClipArt.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      positionNumber: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      img_png: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "ClipArt",
      tableName: "clip_arts",
    },
  );

  return ClipArt;
};
