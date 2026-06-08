const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enquire extends Model {
    static associate(models) {
      this.belongsTo(models.propertyModel, {
        foreignKey: "propertyId",
        as: "property",
      });

      this.belongsTo(models.userModel, {
        foreignKey: "agentId",
        as: "agent",
      });
    }
  }

  Enquire.init(
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
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "enquires",
      modelName: "Enquire",
    },
  );

  return Enquire;
};
