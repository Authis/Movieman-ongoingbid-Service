const express = require("express");
const app = express();

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.PORT;

const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

const db = require("./connections/mongodb-connection");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/movieman", routes);

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected");
});

app.listen(port, () => {
  console.log(`Server Listening in Port ${port} `);
});

module.exports = app;
