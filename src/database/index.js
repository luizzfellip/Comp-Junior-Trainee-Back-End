const Sequelize = require("sequelize");
const Users = require("../apps/modules/Users");
const Books = require("../apps/modules/Books");
const OrderItens = require("../apps/modules/OrdersItems");
const Orders = require("../apps/modules/Orders");

const models = [Users, Books, OrderItens, Orders];
const databaseConfig = require("../configs/db");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models
      .filter((model) => model.associate)
      .map((model) => model.associate(this.connection.models));
  }
}

module.exports = new Database();
