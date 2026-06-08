const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PropertyNearbyPlace extends Model {
    static associate(models) {
      this.belongsTo(models.propertyModel, {
        foreignKey: "propertyId",
        as: "property",
      });
    }
  }

  PropertyNearbyPlace.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      distance: {
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
      tableName: "property_nearby_places",
      modelName: "PropertyNearbyPlace",
    },
  );

  return PropertyNearbyPlace;
};
