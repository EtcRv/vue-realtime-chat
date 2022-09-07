const path = require("path");

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || "chatapp",
    user: process.env.DB_USER || "chatapp",
    password: process.env.DB_PASS || "chatapp",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: path.resolve(__dirname, "../../chatapp.sqlite"),
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
