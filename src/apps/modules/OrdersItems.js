const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class OrderItems extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        book_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(6, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "ordersItems",
      },
    );
    return this;
  }

  static associate(modules) {
    this.belongsTo(modules.Orders, {
      foreignKey: "order_id",
      as: "order",
    });
    this.belongsTo(modules.Books, {
      foreignKey: "book_id",
      as: "book",
    });
  }
}

module.exports = OrderItems;
