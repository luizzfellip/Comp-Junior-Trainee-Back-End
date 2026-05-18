const { UniqueConstraintError, ValidationError } = require("sequelize");

function errorHandler(err, req, res) {
  if (err instanceof UniqueConstraintError) {
    return res.status(400).json({
      message: "Email or username already in use",
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      errors: err.errors.map((e) => e.message),
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
}

module.exports = errorHandler;
