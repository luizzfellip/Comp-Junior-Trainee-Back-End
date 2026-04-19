const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
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

module.exports = Users;
