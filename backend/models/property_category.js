const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PropertyCategory extends Model {
    static associate(models) {
      this.hasMany(models.propertyModel, {
        foreignKey: "propertyCategoryId",
        as: "properties",
      });
    }
  }

  PropertyCategory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "property_categories",
      modelName: "PropertyCategory",
    },
  );
  return PropertyCategory;
};
