"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6, 2),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(
          "pending",
          "paid",
          "shipped",
          "delivered",
          "cancelled",
        ),
        defaultValue: "pending",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Orders");
  },
};
