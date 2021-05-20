const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b8874d5b429249",
  password: "169a02fb",
  database: "heroku_7704eb513bc578f",
});

module.exports = pool;
