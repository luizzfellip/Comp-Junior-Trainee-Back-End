const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const AuthenticationMiddleware = require("./apps/middlewares/authentication");
const AdminAuthorizeMiddleware = require("./apps/middlewares/adminAuthourize");

const AuthenticationController = require("./apps/controllers/AuthenticadorControler");
const authSchema = require("./apps/schema/auth.schema.json");

const UserControler = require("./apps/controllers/UserControle");
const createUserSchema = require("./apps/schema/create.user.schema.json");
const updateUserSchema = require("./apps/schema/update.user.schema.json");

const BookController = require("./apps/controllers/BookController");
const bookSchema = require("./apps/schema/create.book.schema.json");

const asyncHandler = require("./apps/middlewares/asyncHandler");

const routes = new Router();

routes.get("/", (req, res) => {
  return res.send("Connected with success!");
});

routes.post(
  "/user",
  schemaValidator(createUserSchema),
  asyncHandler(UserControler.createUser),
);

routes.post(
  "/auth",
  schemaValidator(authSchema),
  asyncHandler(AuthenticationController.authenticate),
);

routes.use(AuthenticationMiddleware);

routes.put(
  "/user",
  schemaValidator(updateUserSchema),
  asyncHandler(UserControler.update),
);
routes.delete("/user", asyncHandler(UserControler.delete));

routes.get(
  "/book",
  schemaValidator(bookSchema),
  asyncHandler(BookController.getBooks),
);
routes.use(AdminAuthorizeMiddleware("admin"));

routes.put(
  "/book/:id",
  schemaValidator(bookSchema),
  asyncHandler(BookController.updateBook),
);

routes.post(
  "/book",
  schemaValidator(bookSchema),
  asyncHandler(BookController.createBook),
);

module.exports = routes;
