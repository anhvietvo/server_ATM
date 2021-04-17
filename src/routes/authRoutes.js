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

    try {
      // Check username is already existed or not
      var selectSql = `SELECT username FROM Users WHERE username = '${username}'`;

      connection.query(selectSql, function (err, result) {
        // If not exist
        if (_.isEmpty(result)) {
          // Insert to database
          var insertSql = `INSERT INTO Users (username, password, fullname) VALUES ('${username}', '${password}', '${fullname}')`;

          connection.query(insertSql, function (err, result) {
            // Done with sign up
            console.log("An account is registered");
            res.status(200).send("Created");
          });
        } else {
          // There is a similar username exists
          console.log("There is already this username");
          res.status(422).send("username exists");
        }
      })
    } finally {
      if (err) throw err;
      connection.release();
    }
  });
});

module.exports = router;
