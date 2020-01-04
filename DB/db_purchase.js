
const PurchaseModel = require("../models/purchase");
const ObjectId = require("mongoose").Types.ObjectId;


const addPurchase = async (req, res) => {
	
	try {
		
		let body = req.body;
		let fecha = Date.now();
		
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

	let id = query.id;
	let buyerId = query.buyerId;
	let sellerId = query.sellerId;
	let destinationCountry = query.destinationCountry;
	let destinationCity = query.destinationCity;
	
	try {
		
		let purchase;
		
		
		switch (true) {
			
			case id:
				
				purchase = await PurchaseModel.findById(
					id
				);
				
				res.send(purchase);
				
			break;
			
			case buyerId:
				
				purchase = await PurchaseModel.find({
					buyerId: buyerId
				});
				
				res.send(purchase);
				
			break;
			
			case sellerId:
				
				purchase = await PurchaseModel.find({
					sellerId: sellerId
				});
				
				res.send(purchase);
				
			break;
			
			case destinationCountry:
				
				purchase = await PurchaseModel.find({
					destinationCountry: destinationCountry
				});
				
				res.send(purchase);
				
			break;
			
			case destinationCity:
				
				purchase = await PurchaseModel.find({
					destinationCity: destinationCity
				});
				
				res.send(purchase);
				
			break;

			default:
				
				purchase = await PurchaseModel.find({});
				
				res.send(purchase);

			break;
			
		};
		
		
	} catch (err) {
		
		console.log( err );
		
	};
	
	
	
};



module.exports = {
	addPurchase,
	getPurchase,
};