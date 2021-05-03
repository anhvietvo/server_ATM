const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const personalRoutes = require("./routes/personalRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(personalRoutes);

const PORT = 3000;

app.get("/", requireAuth, (req, res) => {
  res.send(req.data.username);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
