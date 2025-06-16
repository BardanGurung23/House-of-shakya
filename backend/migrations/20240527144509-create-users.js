"use strict";
const { GENDER } = require("../constants/value-constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // passwordSetAt: {
      //   type: Sequelize.DATE,
      // },
      gender: {
        type: Sequelize.ENUM(...GENDER),
        allowNull: true,
      },
      // platform: {
      //   type: Sequelize.STRING,
      // },
      // userIdentifier: {
      //   type: Sequelize.STRING,
      // },
      // emailVerificationCode: {
      //   type: Sequelize.INTEGER,
      // },
      // emailVerified: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
      // emailVerifiedRequestDate: {
      //   type: Sequelize.DATE,
      // },
      // emailVerifiedDate: {
      //   type: Sequelize.DATE,
      // },
      // passwordResetCode: {
      //   type: Sequelize.STRING,
      // },
      // passwordResetRequestDate: {
      //   type: Sequelize.DATE,
      // },
      // lastPasswordChangeDate: {
      //   type: Sequelize.DATE,
      // },
      addedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // isAddedByAdmin: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
      // registerMethod: {
      //   type: Sequelize.ENUM(...REGISTRATION_METHOD),
      //   defaultValue: "email",
      // },
      mobileNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobilePrefix: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otp: {
        type: Sequelize.INTEGER,
      },
      // otpGeneratedAt: {
      //   type: Sequelize.DATE,
      // },
      // otpVerified: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
      // otpVerifiedAt: {
      //   type: Sequelize.DATE,
      // },
      // otpVerificationRequestTime: {
      //   type: Sequelize.DATE,
      // },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
      loginAttemptsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
