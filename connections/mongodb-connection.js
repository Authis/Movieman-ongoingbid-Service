const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${encodeURI(
    process.env.DB_PASSWORD
  )}@cluster0.0krgy.mongodb.net/test`
);

module.exports = mongoose.connection;
