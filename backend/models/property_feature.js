const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PropertyFeature extends Model {
    static associate(models) {
      this.belongsTo(models.propertyModel, {
        foreignKey: "propertyId",
        as: "property",
      });
    }
  }

  PropertyFeature.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "property_features",
      modelName: "PropertyFeature",
    },
  );

  return PropertyFeature;
};
