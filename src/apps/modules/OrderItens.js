const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class OrderItens extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

module.exports = OrderItens;
