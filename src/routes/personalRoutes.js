const express = require("express");
const pool = require("../database/mysql");

const _ = require("lodash");

const router = express.Router();
router.post("/personal/add", (req, res) => {
  const {
    PTID,
    title,
    details,
    startDate,
    startTime,
    finishDate,
    finishTime,
    status,
    username,
  } = req.body;

  // Check id in db
  pool.query(
    `SELECT PTID From PersonalTasks WHERE PTID = '${PTID}'`,
    function (err, rows) {
      if (err) throw err;
      if (_.isEmpty(rows)) {
        pool.query(
          `INSERT INTO PersonalTasks (PTID, title, details, startDate, startTime, finishDate, finishTime, status, owner) VALUES ('${PTID}', '${title}', '${details}','${startDate}', '${startTime}', '${finishDate}', '${finishTime}', '${status}', '${username}')`,
          function (err, rows) {
            if (err) throw err;
            console.log("A personal task is added");
            res.status(200).send("Add personal task successfully");
          }
        );
      } else {
        console.log("There is already this personal task id");
        res.status(400).send("PTID exists");
      }
    }
  );
});

router.post("/personal/edit", (req, res) => {
  const { PTID, status } = req.body;

  // Update status of task
  pool.query(
    `UPDATE PersonalTasks SET status = '${status}' WHERE PTID = '${PTID}'`,
    function (err, rows) {
      if (err) throw err;
      console.log(`Update status of ${PTID} to ${status}`);
      res.status(200).send("Update status successfully");
    }
  );
});

module.exports = router;
