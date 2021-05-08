const express = require("express");
const pool = require("../database/mysql");
const _ = require("lodash");

const router = express.Router();

router.post("/team/add", (req, res) => {
  const { TID, name, details, manager } = req.body;

  // Check TID in db
  pool.query(
    `SELECT TID FROM Teams WHERE TID = '${TID}'`,
    function (err, rows) {
      if (err) throw err;
      // If don't have TID insert new team
      if (_.isEmpty(rows)) {
        pool.query(
          `INSERT INTO Teams (TID, name, details, manager) VALUES ('${TID}', '${name}', '${details}', '${manager}')`,
          function (err, rows) {
            if (err) throw err;
            console.log("A new team is created");
            res.status(200).send("Create new team successfully");
          }
        );
      } else {
        console.log("There is already this team id");
        res.status(400).send("TID existed");
      }
    }
  );
});

module.exports = router;
