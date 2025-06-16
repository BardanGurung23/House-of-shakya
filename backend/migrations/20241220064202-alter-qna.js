"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the existing foreign key constraint
    await queryInterface.removeConstraint("qna", "qna_ibfk_1");

    // Add the foreign key constraint with ON DELETE CASCADE
    await queryInterface.addConstraint("qna", {
      fields: ["employeeId"],
      type: "foreign key",
      name: "qna_ibfk_1",
      references: {
        table: "employees",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to the previous state (remove the foreign key constraint)
    await queryInterface.removeConstraint("qna", "qna_ibfk_1");

    await queryInterface.addConstraint("qna", {
      fields: ["employeeId"],
      type: "foreign key",
      name: "qna_ibfk_1",
      references: {
        table: "employees",
        field: "id",
      },
      onUpdate: "CASCADE",
    });
  },
};
