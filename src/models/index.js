const Sequelize = require("sequelize");

const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "password",
  PORT: "5432",
  DB: "postgres",
  dialect: "postgres",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

// db 객체를 생성해서 내보내 준다.
const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);

module.exports = db;
