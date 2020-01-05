
const PurchaseModel = require("../models/purchase");
const ObjectId = require("mongoose").Types.ObjectId;


const addPurchase = async (req, res) => {
	
	try {
		
		let body = req.body;
		
		let fecha = new Date().toISOString().slice(0,10);
		
		const purchase = await new PurchaseModel({
			buyerId: 			ObjectId(body.buyerId),
			sellerId: 			ObjectId(body.sellerId),
			date: 				fecha,
			originLocation:     body.originLocation,
			// originCity: 		body.originCity,
			// originCountry: 		body.originCountry,
			destinationCity: 	body.destinationCity,
			destinationCountry: body.destinationCountry,
			items: 				body.items,
			totalValue: 		body.totalValue,
			status: 			0
		}).save();
		
		
		res.send({
			message: "Compra realizada con éxito.",
			purchaseInfo: purchase
		});
		
		
	} catch (err) {
		
		console.log( err );
		
	};
	
};



const getPurchase = async (req, res) => {

	let query = req.query;

	// ----------------
	// Stage LIMIT
	// ----------------
	
	// let limit = req.query.limit;	
	
	let stage_limit = 500;

	// ----------------
	// Genero el array del AGGREGATE
	// ----------------
	
	let arrAggregate = [];

	// Stages obligatorias
	arrAggregate = [
		
		...arrAggregate,
		
		
		// { $sort: stage_sort },
		// { $skip: stage_skip },
		// { $match: stage_match },
		{ $limit: stage_limit },
		
		{ $lookup:
			{
				from: "users",
				localField: "sellerId",
				foreignField: "_id",
				as: "__sellerUsername"
			}
		},
		{ $unwind: "$__sellerUsername"},
		{ $addFields: {
				_ownerUsername: "$__sellerUsername.username"
			}
		},
		
		{ $lookup:
			{
				from: "users",
				localField: "buyerId",
				foreignField: "_id",
				as: "__buyerUsername"
			}
		},
		{ $unwind: "$__buyerUsername"},
		{ $addFields: {
				_buyerUsername: "$__buyerUsername.username"
			}
		}
		
	];

	
	// ----------------
	// Finalizo
	// ----------------
	
	PurchaseModel.aggregate(arrAggregate).then( (purchase) => {
		
		if (purchase) {
			res.send(purchase);
		} else {
			res.send({message: `Purchases not found.`});
		}
		
	}).catch( (err) => {
		console.log( err );
	});
	
	
	
};


module.exports = {
	addPurchase,
	getPurchase,
};