const express = require("express");
const router = express.Router();

const {
  insertOnGoingData,
  getOnGoingBids,
  editOnGoingBidData,
  deleteOnGoingBidData,
} = require("../service/onGoingBid-service");

router.post("/add", async (req, res) => {
  const data = await insertOnGoingData(req.body);
  if (data.success) {
    res.status(201).send(data);
  } else {
    res.status(500).send();
  }
});

router.get("/get/ongoingbids", async (req, res) => {
   
 
  const data = await getOnGoingBids();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.status(404).send();
  }
});
 
router.post("/edit", async (req, res) => {
  const data = await editOnGoingBidData(req.body);
  if (data.success) {
    res.send(data);
  } else {
    res.status(500).send();
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  const data = await deleteOnGoingBidData(id);
  if (data.success) {
    res.status(200).send(data);
  } else {
    res.status(500).send();
  }
});

module.exports = router;
