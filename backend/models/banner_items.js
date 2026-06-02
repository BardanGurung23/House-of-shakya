const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  class BannerItems extends Model {
    static associate(models) {
      this.belongsTo(models.bannerModel, {
        foreignKey: "bannerId",
      });
    }
  }
  BannerItems.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subTitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primaryButton: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primaryButtonUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secondaryButton: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secondaryButtonUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overlayColor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "#00152f",
      },
      overlayOpacity: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.45,
      },
      overlayDirection: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "to right",
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "banner_items",
      modelName: "BannerItems",
    },
  );
  return BannerItems;
};
