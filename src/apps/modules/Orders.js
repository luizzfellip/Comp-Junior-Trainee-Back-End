const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        total_price: Sequelize.DECIMAL(6, 2),
        status: Sequelize.ENUM(
          "pending",
          "paid",
          "shipped",
          "delivered",
          "cancelled",
        ),
        password_hash: Sequelize.STRING,
        role: Sequelize.ENUM("admin", "customer"),
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

module.exports = Orders;
