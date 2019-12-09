
const RatingModel = require("../models/Rating");
const ObjectId = require("mongoose").Types.ObjectId;


const getAllRatings = (req, res) => {
	
	RatingModel.find(
		{}
	).then( (ratings) => {
		res.send(ratings);
	}).catch( (err) => {
		console.log( err );
	});
	
};


const addRating = (req, res) => {
	
	let bodyData = req.body;
	
	
	// Paso de strings as ObjectId
	let productObjectId = ObjectId(bodyData.productId);
	let ratedObjectId = ObjectId(bodyData.raterId);
	let raterObjectId = ObjectId(bodyData.ratedId);
	
	
	// Creo un nuevo rating
	const rating = new RatingModel({
		productId: productObjectId,
		raterId: ratedObjectId,
		ratedId: raterObjectId,
		value: bodyData.value,
		comment: bodyData.comment
	})
	.save()
	.then( () => {
		res.send(rating);
	})
	.catch( (err) => {
		console.log( err );
	});
	
};



const getRatingsByRated = (req, res) => {
	
	let ratedId = req.query.id;
	
	
	RatingModel.aggregate([ 
		{
			$match: {ratedId: ObjectId(ratedId)}
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
		{
			$project:
			{
				_id: 0,
				value: 1,
				comment: 1,
				"ratedInfo.username": 1,
				"ratedInfo._id": 1
			}
		}
	])
	.then( (rated) => {
		res.send(rated);
	})
	.catch( (err) => {
		console.log("ERR: ", err );
	});	
	
};


const getFeedback = (req, res) => {
	
	let userId = req.query.id;
	
	
	RatingModel.aggregate([
		{
			$match: { ratedId: ObjectId(userId) }
		},
		{
			$group: {
				_id: '',
				value: { $sum: "$value" },
				totalRatings: { $sum: 1 }
			}
		},
		{
			$project: {
				_id: 0,
				value: "$value",
				totalRatings: 1
			}
		}
	])
	.then(feedback => {
		
		console.log( feedback );
		
		// Si no hay ratings, devuelvo ceros
		if (feedback.length === 0) {
			res.send({
				value: 0,
				totalRatings: 0
			});
			
			return;
		};
		
		
		// Todo normal
		res.send(feedback);
		
	})
	.catch(err => {
		console.log("ERR: ", err);
	});	
	
};






module.exports = {
	getAllRatings,
	addRating,
	getRatingsByRated,
	getFeedback,
	
};






/*

RatingModel.aggregate([ 
		{
			$match: {ratedId: ObjectId("5de6863f19d26244901c7ec2")}
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
	
*/