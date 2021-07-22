const express = require("express");
const router = express.Router();

const onGoingBidRoute = require("./onGoingBid-route");

router.use("/ongoingbid", onGoingBidRoute);

module.exports = router;
