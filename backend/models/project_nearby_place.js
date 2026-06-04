const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProjectNearbyPlace extends Model {
    static associate(models) {
      this.belongsTo(models.projectsModel, {
        foreignKey: "projectId",
        as: "project",
      });
    }
  }

  ProjectNearbyPlace.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectId: {
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
      tableName: "project_nearby_places",
      modelName: "ProjectNearbyPlace",
    },
  );

  return ProjectNearbyPlace;
};
