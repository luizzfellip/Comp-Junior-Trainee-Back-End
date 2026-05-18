const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class OrderItens extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
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

module.exports = OrderItens;
