const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
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
        tableName: "orders",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user",
    });
    this.hasMany(models.OrderItems, {
      foreignKey: "order_id",
      as: "items",
    });
  }
}

module.exports = Orders;
