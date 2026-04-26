const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const AuthenticationController = require("./apps/controllers/AuthenticadorControler");
const authSchema = require("./apps/schema/auth.schema.json");

const UserControler = require("./apps/controllers/UserControle");
const userSchema = require("./apps/schema/create.user.schema.json");

const routes = new Router();

routes.get("/", (req, res) => {
  return res.send("Connected with success!");
});

routes.post("/user", schemaValidator(userSchema), UserControler.createUser);

routes.put("user", UserControler.update);

routes.post(
  "/auth",
  schemaValidator(authSchema),
  AuthenticationController.authenticate,
);

routes.use(AuthenticationMiddleware);

module.exports = routes;
