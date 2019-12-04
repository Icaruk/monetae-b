
const mongoose = require("mongoose");


const RatingSchema = mongoose.Schema({
	
	itemId: {
		type: String
	},
	raterId: {
		type: String
	},
	ratedId: {
		type: String
	},
	value: {
		type: Number
	},
	comment: {
		type: String
	}
	
});


const RatingModel = mongoose.model("rating", RatingSchema);
module.exports = RatingModel;

