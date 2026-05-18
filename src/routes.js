const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const AuthenticationController = require("./apps/controllers/AuthenticadorControler");
const authSchema = require("./apps/schema/auth.schema.json");

const UserControler = require("./apps/controllers/UserControle");
const userSchema = require("./apps/schema/create.user.schema.json");

const asyncHandler = require("./apps/middlewares/asyncHandler");

const routes = new Router();

routes.get("/", (req, res) => {
  return res.send("Connected with success!");
});

routes.post(
  "/user",
  schemaValidator(userSchema),
  asyncHandler(UserControler.createUser),
);

routes.post(
  "/auth",
  schemaValidator(authSchema),
  asyncHandler(AuthenticationController.authenticate),
);

routes.use(AuthenticationMiddleware);

routes.put("/user", asyncHandler(UserControler.update));
routes.delete("/user", asyncHandler(UserControler.delete));

module.exports = routes;
