const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_name: {
          type: Sequelize.STRING,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          validate: {
            isEmail: {
              msg: "Invalid email format",
            },
          },
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        role: Sequelize.ENUM("admin", "customer"),
      },
      {
        sequelize,
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(
          user.password,
          process.env.SALT,
        );
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

module.exports = Users;
