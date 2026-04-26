const Users = require("../modules/Users");
const bcryptjs = require("bcryptjs");

class UserControler {
  async createUser(req, res) {
    const verifyUserEmail = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    const verifyUserName = await Users.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (verifyUserEmail) {
      return res.status(400).json({ message: "User already existis!" });
    }

    if (verifyUserName) {
      return res.status(400).json({ message: "Username is already in use!" });
    }

    const user = await Users.create(req.body);
    if (!user) {
      return res.status(400).json({ message: "Failed to create a user!" });
    }

    return res.status(200).json({ message: "User created with success!" });
  }

  async update(req, res) {
    const { name, old_password, new_password, confirm_new_password } = req.body;

    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }

    let encryptedPassword = "";

    if (old_password) {
      if (!(await user.checkPassword(old_password))) {
        return res.status(401).json({ error: "Old password does not match!" });
      }

      if (new_password != confirm_new_password) {
        return res
          .status(401)
          .json({
            error: "New password and confirm new password does not match!",
          });
      }

      encryptedPassword = await bcryptjs.hash(new_password);
    }

    await Users.update(
      {
        password_hash: encryptedPassword || user.password_hash,
      },
      {
        where: {
          id: user.id,
        },
      },
    );

    return res.status(200).json({ message: "User updated!" });
  }
}

module.exports = new UserControler();
