const { Model } = require("sequelize");
const { PROPERTY_STATUS } = require("../constants/value-constants");

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      this.belongsTo(models.propertyCategoryModel, {
        foreignKey: "propertyCategoryId",
        as: "category",
      });

      this.hasMany(models.propertyMediaModel, {
        foreignKey: "propertyId",
        as: "images",
      });
    }
  }

  Property.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      propertyCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      beds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bath: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      anna: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...PROPERTY_STATUS),
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "properties",
      modelName: "Property",
    },
  );
  return Property;
};
