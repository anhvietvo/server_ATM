const express = require("express");

const app = express();
const mysql = require("mysql");

const PORT = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
