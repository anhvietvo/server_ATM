const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const PORT = 3000;

app.get("/", requireAuth, (req, res) => {
  res.send(req.data.username);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
