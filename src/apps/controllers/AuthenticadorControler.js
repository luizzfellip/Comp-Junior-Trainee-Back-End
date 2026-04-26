const jwt = require("jsonwebtoken");
const Users = require("../modules/Users");
const { encrypt } = require("../../utils/cript");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    let whereClause = {};
    if (email) {
      whereClause = { email };
    } else if (user_name) {
      whereClause = { user_name };
    } else {
      return res
        .status(401)
        .json({ error: "Need to pass e-mail or user_name!" });
    }

    const user = await Users.findOne({
      where: whereClause,
    });

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    const { id, user_name: userName } = user;

    const token = jwt.sign({ id }, process.env.HASH_BCRYPT, {
      expiresIn: process.env.EXPIRE_IN,
    });

    const { iv, content } = encrypt(id);
    const newId = `${iv}:${content}`;

    return res
      .status(200)
      .json({ user: { id: newId, user_name: userName }, token });
  }
}

module.exports = new AuthenticationController();
