const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Books extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        author: Sequelize.STRING,
        year: Sequelize.INTEGER,
        detail: Sequelize.STRING,
        price: Sequelize.DECIMAL(6, 2),
        stock: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

module.exports = Books;
