"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      this.belongsTo(models.projectCategoryModel, {
        foreignKey: "projectCategoryId",
        as: "category",
      });

      this.hasMany(models.projectMediaModel, {
        foreignKey: "projectId",
        as: "images",
      });

      this.hasMany(models.projectFeatureModel, {
        foreignKey: "projectId",
        as: "features",
      });

      this.hasMany(models.projectNearbyPlaceModel, {
        foreignKey: "projectId",
        as: "nearbyPlaces",
      });

      this.belongsTo(models.userModel, {
        foreignKey: "agentId",
        as: "agent",
      });
    }
  }

  Projects.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleMapURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
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
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bannerMedia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bannerMediaType: {
        type: DataTypes.ENUM("image", "video"),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Projects",
      tableName: "projects",
    },
  );

  return Projects;
};
