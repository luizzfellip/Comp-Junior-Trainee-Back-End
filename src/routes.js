const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const UserControler = require("./apps/controllers/UserControle");
const userSchema = require("./apps/schema/create.user.schema.json");

const routes = new Router();

routes.get("/", (req, res) => {
  return res.send("Connected with success!");
});

routes.post("/user", schemaValidator(userSchema), UserControler.createUser);

module.exports = routes;
