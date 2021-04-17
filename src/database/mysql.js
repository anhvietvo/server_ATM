const mysql = require('mysql');

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Android_Task_Monitoring"
});

module.exports = connection;
