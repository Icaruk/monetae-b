
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const RatingSchema = mongoose.Schema({
	
	productId: {
		type: ObjectId
	},
	raterId: {
		type: ObjectId
	},
	ratedId: {
		type: ObjectId
	},
	value: {
		type: Number
	},
	comment: {
		type: String,
		default: ""
	}
	
});


const RatingModel = mongoose.model("rating", RatingSchema);
module.exports = RatingModel;

