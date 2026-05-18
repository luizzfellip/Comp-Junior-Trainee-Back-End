const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Books extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        author: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        detail: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(6, 2),
          allowNull: false,
        },
        stock: {
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
}

module.exports = Books;
