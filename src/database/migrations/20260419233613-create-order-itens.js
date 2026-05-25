"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ordersItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "orders", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "books", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },

      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6, 2),
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("ordersItens");
  },
};
