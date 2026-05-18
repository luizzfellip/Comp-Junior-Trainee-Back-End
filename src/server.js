//require("dotenv").config();
require("./database/index");
const routes = require("./routes");
const express = require("express");
const app = express();
const errorHandler = require("./apps/middlewares/errorHandler");

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
