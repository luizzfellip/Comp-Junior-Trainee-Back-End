const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Books extends Model {
  static init(sequelize) {
    super.init(
      {
        isbn: {
          type: Sequelize.STRING,
          unique: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        author: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        publisher: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
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
