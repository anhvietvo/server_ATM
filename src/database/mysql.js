const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Android_Task_Monitoring",
});

module.exports = pool;
