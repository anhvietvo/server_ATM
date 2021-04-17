const express = require("express");
const pool = require("../database/mysql");
const jwt = require("jsonwebtoken");

const _ = require("lodash");

const router = express.Router();

// Signup new account
router.post("/signup", (req, res) => {
  const { username, password, fullname } = req.body;

  // Check name in database
  pool.query(
    `SELECT username FROM Users WHERE username = '${username}'`,
    function (err, rows) {
      if (err) throw err;
      if (_.isEmpty(rows)) {
        // Insert to database
        pool.query(
          `INSERT INTO Users (username, password, fullname) VALUES ('${username}', '${password}', '${fullname}')`,
          function (err, rows) {
            if (err) throw err;

            console.log("An account is created");
            const token = jwt.sign({ username }, "MY_SECRET_KEY");
            res.send({ token });
          }
        );
      } else {
        // There is a similar username exists
        console.log("There is already this username");
        res.status(422).send("username exists");
      }
    }
  );
});

module.exports = router;
