const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const AuthenticationMiddleware = require("./apps/middlewares/authentication");
const AdminAuthorizeMiddleware = require("./apps/middlewares/adminAuthourize");

const AuthenticationController = require("./apps/controllers/AuthenticadorControler");
const authSchema = require("./apps/schema/auth.schema.json");

const UserControler = require("./apps/controllers/UserControle");
const createUserSchema = require("./apps/schema/create.user.schema.json");
const updateUserSchema = require("./apps/schema/update.user.schema.json");

const OrderController = require("./apps/controllers/OrderController");
const createOrderSchema = require("./apps/schema/create.order.schema.json");

const BookController = require("./apps/controllers/BookController");
const createBookSchema = require("./apps/schema/create.book.schema.json");
const createManualBookSchema = require("./apps/schema/create.manual.book.schema.json");

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

routes.get("/book", asyncHandler(BookController.getBooks));

routes.post(
  "/order",
  schemaValidator(createOrderSchema),
  asyncHandler(OrderController.createOrder),
);
routes.get("/order", asyncHandler(OrderController.getOrders));

routes.use(AdminAuthorizeMiddleware("admin"));

routes.put("/book/:id", asyncHandler(BookController.updateBook));

routes.post(
  "/book",
  schemaValidator(createBookSchema),
  asyncHandler(BookController.createBook),
);

routes.post(
  "/book/manual",
  schemaValidator(createManualBookSchema),
  asyncHandler(BookController.createManualbook),
);

module.exports = routes;
