const express = require("express");
const db = require("../database/mysql");

const _ = require("lodash");

const router = express.Router();

// Signup new account
router.post("/signup", (req, res) => {
  const { username, password, fullname } = req.body;

  db.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("MySQL connected!");

    // Check username is already existed or not
    var selectSql = `SELECT username FROM Users WHERE username = '${username}'`;

    connection.query(selectSql, function (error, result) {
      // If not exist
      if (_.isEmpty(result)) {
        // Insert to database
        var insertSql = `INSERT INTO Users (username, password, fullname) VALUES ('${username}', '${password}', '${fullname}')`;

        connection.query(insertSql, () => {
          // Done with sign up
          console.log("An account is registered");
          res.status(200).send("Created");
        });
      } else {
        // There is a similar username exists
        console.log("There is already this username");
        res.status(422).send("username exists");
      }
      connection.release();
      if (error) throw error;
    })
  });
});

module.exports = router;
