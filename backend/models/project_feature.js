const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProjectFeature extends Model {
    static associate(models) {
      this.belongsTo(models.projectsModel, {
        foreignKey: "projectId",
        as: "project",
      });
    }
  }

  ProjectFeature.init(
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
      tableName: "project_features",
      modelName: "ProjectFeature",
    },
  );

  return ProjectFeature;
};
