const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        total_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(
            "pending",
            "paid",
            "shipped",
            "delivered",
            "cancelled",
          ),
          defaultValue: "pending",
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

module.exports = Orders;
