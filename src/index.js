const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const personalRoutes = require("./routes/personalRoutes");
const teamRoutes = require("./routes/teamRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(personalRoutes);
app.use(teamRoutes);

const PORT = 3000;

app.get("/", requireAuth, (req, res) => {
  res.send(req.data);
});

app.listen(process.env.PORT || PORT, () => {
  console.log("App is listening ...");
});
