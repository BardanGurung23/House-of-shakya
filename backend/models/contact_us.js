const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class contactUs extends Model {
    static associate(models) {}
  }

  contactUs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "contact_us",
      modelName: "contactUs",
      timestamps: true,
    },
  );

  return contactUs;
};
