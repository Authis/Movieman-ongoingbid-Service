const onGoingBid = require("../schema/onGoingBid");

const insertOnGoingData = async (biddings) => {
  //biddings.insertedDate = new Date();
 // biddings.updatedDate = new Date();
  console.log("I am in ongoing bid service ", JSON.stringify( biddings));
   let incBidID;
  const data = await onGoingBid.find().sort({ bidId: -1 }).limit(1);
  
  if (data[0] !== undefined) {
    var str = data[0].bidId.substring(0, 3);
    var num = data[0].bidId.substring(3, 11);
    num = +num + 1;
    incBidID = str + num;
  } else {
    incBidID = "BID10000001";
  }
  console.log("I am in ongoing bid service ", incBidID);
  let onGoingBidArr;
   let bidSpan = biddings.data.bidSpan;
  try {
    biddings.data.arrayIds.map(async (bid, i) => {
      console.log("I am in ongoing bid >>>>>> ", bid);
      var splitVal = bid.split("|");
      onGoingBidArr = {
        screeningID: splitVal[0],
        movieID:splitVal[1],
        theatreID:splitVal[2],
        bidId: incBidID,
        bidStatus: "ACTIVE",
        city:splitVal[3],
        bidSpan:bidSpan,
        insertedDate: new Date(),
        updatedDate: new Date(),
      }
      const data = new onGoingBid(onGoingBidArr);
      await data.save();
    })
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};
 

const getOnGoingBids = async () => {
  try {
    const data = await onGoingBid.aggregate([
      {
        $project:
        {
          screeningID: true,
          bidId: true,
          city:true,
          bidSpan:true,
          bidStatus: true,
        }
      }, {
        $lookup:
        {
          from: "screenings",
          localField: "screeningID",
          foreignField: "_id",
          as: "screeningDetails"
        }
      }]);
    console.log("getOnGoingBIDData>>>>>>>>>>>>>", data);
    return data;
  } catch (e) {
    return null;
  }
};

 
 

const editOnGoingBidData = async (bidData) => {
  const { id } = bidData;
  bidData.updatedDate = new Date();
  try {
    await movie.findByIdAndUpdate({ _id: id }, bidData);
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};

const deleteOnGoingBidData = async (id) => {
  try {
    await movie.findByIdAndDelete(id);
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};

module.exports = {
  insertOnGoingData,
  getOnGoingBids,
  editOnGoingBidData,
  deleteOnGoingBidData,
};
