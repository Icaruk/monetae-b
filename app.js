
// Imports
const express = require("express");
const app = express();



// Init DB
require("./DB/db_init")();



// Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
    next();
});
app.use(express.json()); // parsea objetos STRING a JSON 



// Routes
app.use(require("./routes/rt_user"));



// --------------------
// TEST
// --------------------

const UserModel = require("./models/User");
const RatingModel = require("./models/Rating");
const ObjectId = require("mongoose").Types.ObjectId;



RatingModel.aggregate([ 
	{
		$match: {raterId: ObjectId("5de6863f19d26244901c7ec2")}
	},
	{
		$lookup: {
			from: "users",
			localField: "raterId",
			foreignField: "_id",
			as: "raterInfo"
		}
	},
	{
		$lookup: {
			from: "users",
			localField: "ratedId",
			foreignField: "_id",
			as: "ratedInfo"
		}
	},
	{$unwind: "$ratedInfo"},
	{$unwind: "$raterInfo"},
	{
		$project:
		{
			_id: 0,
			value: 1,
			comment: 1,
			"ratedInfo.username": 1,
			"raterInfo.username": 1,
		}
	}
])
.then( (res) => {
	console.log( res );
})
.catch( (err) => {
	console.log("ERR: ", err );
});



// Init srv
app.listen(3000, ( () => {
	console.log( "    ---> Server listening on port 3000" );
}));

