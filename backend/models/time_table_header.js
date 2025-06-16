"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TimeTableHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // has many employee  late do--
      this.hasMany(models.timeTableModel, {
        foreignKey: "timeTableHeaderId",
      });
    }
  }

  TimeTableHeader.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      heading: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sub_heading: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "TimeTableHeader",
      tableName: "time_table_header",
    },
  );

  return TimeTableHeader;
};
