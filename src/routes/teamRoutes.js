const express = require("express");
const pool = require("../database/mysql");
const _ = require("lodash");

const router = express.Router();

// Create new Team
router.post("/team/add", (req, res) => {
  const { TID, name, details, manager } = req.body;

  // Check TID in db
  pool.query(`SELECT TID FROM Teams WHERE TID = ${TID}`, function (err, rows) {
    if (err) throw err;
    // If don't have TID insert new team
    if (_.isEmpty(rows)) {
      // Insert new team in Teams-schema
      pool.query(
        `INSERT INTO Teams (TID, name, details, manager) VALUES (${TID}, '${name}', '${details}', '${manager}')`,
        function (err, rows) {
          if (err) throw err;
          console.log("A new team is created");
          //res.status(200).send("Create new team successfully");
        }
      );

      // Insert this manager and this team to Employees-schema
      pool.query(
        `INSERT INTO Employees (TID, username) VALUES (${TID}, '${manager}')`,
        function (err, rows) {
          if (err) throw err;
          console.log("This username is added into Employees table");
        }
      );

      res.status(200).send("Create new team successfully");
    } else {
      console.log("There is already this team id");
      res.status(400).send("TID existed");
    }
  });
});

// Get the list of team which user join in
router.post("/team", (req, res) => {
  const { username } = req.body;

  pool.query(
    // Search this username in 2 tables Teams and Employees
    `SELECT Teams.* FROM Teams INNER JOIN Employees ON Teams.TID = Employees.TID WHERE Employees.username = '${username}'`,
    function (err, rows) {
      if (err) throw err;
      res.status(200).send(rows);
    }
  );
});

// Add new user to team
router.post("/team/user", (req, res) => {
  const { username, TID } = req.body;

  // check user existed or not
  pool.query(
    `SELECT username FROM Users WHERE username = '${username}'`,
    function (err, rows) {
      if (err) throw err;
      if (_.isEmpty(rows)) {
        return res.status(404).send("Not found this username");
      }
      // If this username existed -> check is added to this team before or not
      pool.query(
        `SELECT * FROM Employees WHERE username = '${username}' AND TID = '${TID}'`,
        function (err, rows) {
          if (err) throw err;
          // If this username is not added to this team -> Now add to
          // Employees-schema
          if (_.isEmpty(rows)) {
            return pool.query(
              `INSERT INTO Employees (username, TID) VALUES ('${username}', ${TID})`,
              function (err, rows) {
                if (err) throw err;
                return res.status(200).send(`${username} is added`);
              }
            );
          }
          return res.status(400).send("This username has been added already");
        }
      );
    }
  );
});

// Load all employees in a team
router.post("/team/employees", function (req, res) {
  const { TID } = req.body;
  pool.query(
    `SELECT username FROM Employees WHERE TID = '${TID}'`,
    function (err, rows) {
      if (err) throw err;
      return res.status(200).send(rows);
    }
  );
});

module.exports = router;
