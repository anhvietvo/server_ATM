const jwt = require("jsonwebtoken");
const pool = require("../database/mysql");

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in" });
    }
    const promisePool = pool.promise();
    const [ rows, fields ] = await promisePool.query(`SELECT * FROM Users WHERE username = '${payload.username}'`) 

    req.data = rows[0];
    next();
  })

  //function runSql(username) {
    //db.getConnection(function (err, connection) {
      //if (err) throw err;

      //var selectSql = `SELECT * FROM Users WHERE username = '${username}'`;
      //connection.query(selectSql, function (error, result) {
        //req = result[0];

        //connection.release();
        //if (error) throw error;
      //});
    //});
    //return req
  //}
};
