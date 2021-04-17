const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

//const mysql = require("mysql");
const PORT = 3000;

//const connection = mysql.createPool({
  //host: "localhost",
  //user: "root",
  //password: "password",
//});

app.get("/", (req, res) => {
  res.send("Hello, world!");
  //connection.getConnection(function (err) {
    //if (err) throw err;
    //console.log("Connected!");
  //});
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
