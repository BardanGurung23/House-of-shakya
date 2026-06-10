const { Model, Sequelize } = require("sequelize");
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

      this.hasMany(models.enquireModel, {
        foreignKey: "propertyId",
        as: "enquiries",
      });

      this.hasMany(models.propertyFeatureModel, {
        foreignKey: "propertyId",
        as: "features",
      });

      this.hasMany(models.propertyNearbyPlaceModel, {
        foreignKey: "propertyId",
        as: "nearbyPlaces",
      });

      this.belongsTo(models.userModel, {
        foreignKey: "agentId",
        as: "agent",
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
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      type: {
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
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      problem: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      solution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parking: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      view: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearBuilt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      completionDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleMapURL: {
        type: DataTypes.TEXT,
        allowNull: true,
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
