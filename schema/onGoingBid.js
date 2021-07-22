const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OnGoingBID = new Schema({
  onGoingBidID: ObjectId,
  movieID:ObjectId,
  theatreID:ObjectId,
  bidId: String,
  screeningID: ObjectId,
  bidStatus:String,
  city:String,
  bidSpan:String,
  insertedDate: Date,
  updatedDate: Date,
});

const onGoingBid = mongoose.model("OnGoingBID", OnGoingBID);

module.exports = onGoingBid;
