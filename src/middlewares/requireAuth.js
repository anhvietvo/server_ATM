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
    const [ rows, fields ] = await promisePool.query(`SELECT username, fullname, UID FROM Users WHERE username = '${payload.username}'`) 

    req.data = rows[0];
    next();
  })
};
