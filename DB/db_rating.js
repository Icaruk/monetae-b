
const RatingModel = require("../models/Rating");


// --------------------
// TEST
// --------------------

const ObjectId = require("mongoose").Types.ObjectId;



// RatingModel.aggregate([ 
// 	{
// 		$match: {raterId: ObjectId("5de6863f19d26244901c7ec2")}
// 	},
// 	{
// 		$lookup: {
// 			from: "users",
// 			localField: "raterId",
// 			foreignField: "_id",
// 			as: "raterInfo"
// 		}
// 	},
// 	{
// 		$lookup: {
// 			from: "users",
// 			localField: "ratedId",
// 			foreignField: "_id",
// 			as: "ratedInfo"
// 		}
// 	},
// 	{$unwind: "$ratedInfo"},
// 	{$unwind: "$raterInfo"},
// 	{
// 		$project:
// 		{
// 			_id: 0,
// 			value: 1,
// 			comment: 1,
// 			"ratedInfo.username": 1,
// 			"raterInfo.username": 1,
// 		}
// 	}
// ])
// .then( (res) => {
// 	console.log( res );
// })
// .catch( (err) => {
// 	console.log("ERR: ", err );
// });



module.exports = {
	
};