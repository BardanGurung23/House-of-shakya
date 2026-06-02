const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PropertyCategory extends Model {
    static associate(models) {
      this.hasMany(models.projectsModel, {
        foreignKey: "projectCategoryId",
        as: "projects",
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
      tableName: "project_categories",
      modelName: "ProjectCategory",
    },
  );
  return PropertyCategory;
};
