const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
require("dotenv").config();

var userRoute = require("./app/Router/route");
console.log("Token- > ", process.env.TOKEN);
app.use("/", userRoute);

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
module.exports = app;