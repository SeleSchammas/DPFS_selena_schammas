const { Sequelize } = require("sequelize");
const config = require("../config/config");

const env = "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Product = require("./Product")(sequelize, Sequelize.DataTypes);
const Category = require("./Category")(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Product,
  Category,
};

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
