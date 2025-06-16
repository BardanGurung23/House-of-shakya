"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TimeTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // has many employee  late do--
      this.belongsTo(models.timeTableHeaderModel, {
        foreignKey: "timeTableHeaderId",
      });
    }
  }

  TimeTable.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      timeTableHeaderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "TimeTable",
      tableName: "time_table",
    },
  );

  return TimeTable;
};
