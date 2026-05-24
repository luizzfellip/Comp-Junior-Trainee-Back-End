const { decryptedToken } = require("../../utils/token");
const { decrypt } = require("../../utils/cript");
const User = require("../modules/Users");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unset token!" });
  }

  try {
    const { userId } = await decryptedToken(authHeader);
    const id = parseInt(decrypt(userId));

    const user = await User.findByPk(id);
    if (!user) return res.status(401).json({ message: "Unauthorized!" });

    req.userId = id;
    req.user = user;

    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = verifyJwt;
