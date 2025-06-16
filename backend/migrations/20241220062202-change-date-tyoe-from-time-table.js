module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("time_table", "date", {
      type: Sequelize.TIME,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("time_table", "date", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
