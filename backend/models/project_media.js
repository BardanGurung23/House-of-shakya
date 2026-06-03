const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProjectMedia extends Model {
    static associate(models) {
      this.belongsTo(models.projectsModel, {
        foreignKey: "projectId",
        as: "projects",
      });
    }
  }

  ProjectMedia.init(
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("image", "video"),
        allowNull: false,
        defaultValue: "image",
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "project_media",
      modelName: "ProjectMedia",
    },
  );
  return ProjectMedia;
};
