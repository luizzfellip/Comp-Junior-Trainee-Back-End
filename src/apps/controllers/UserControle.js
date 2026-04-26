const Users = require("../modules/Users");

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
}

module.exports = new UserControler();
