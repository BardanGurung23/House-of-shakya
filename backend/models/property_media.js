const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PropertyMedia extends Model {
    static associate(models) {
      this.belongsTo(models.propertyModel, {
        foreignKey: "propertyId",
        as: "property",
      });
    }
  }

  PropertyMedia.init(
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "property_media",
      modelName: "PropertyMedia",
    },
  );
  return PropertyMedia;
};
