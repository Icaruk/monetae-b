
const ProductModel = require("../models/Product");
const TokenModel = require("../models/Token");
const ObjectId = require('mongoose').Types.ObjectId;

const addProduct = async (req, res) => {
	
	try {
		
        let bodyData = req.body;
        
        let ownerId = bodyData.ownerId;
		
		const product = await new ProductModel({
			ownerId: ObjectId(ownerId),
			category: bodyData.category,
            imageUrl: bodyData.imageUrl,
            title: bodyData.title,
			description: bodyData.description,
			price: bodyData.price,
            timesSold: bodyData.timesSold,
            rating: bodyData.rating,
            stock: bodyData.stock,
            activeStock: bodyData.activeStock,
            location: bodyData.location,
            isActive: bodyData.isActive
			
		}).save();
		
		
		res.send({
			message: "Product added successfully.",
            product: product
		});
		
		
	} catch (err) {
		
		console.log(err);
	};
	
};

const editProduct = async (req, res) => {
	
	let productId = req.body.productId;
	
	
	// Esta movida se haría en el front
	// Aquí recibiríamos objLimpio 
	let objLimpio = {};
	let arr = ["imageUrl", "title", "description", "price", "stock", "activeStock", "isActive"];
	
	for (let _x of arr) {
		if (req.body[_x]) {
			objLimpio[_x] = req.body[_x];
		};
	};
	
	objLimpio.productId = ObjectId(objLimpio.productId);
	
	
	// Busco al usuario y lo updateo
	ProductModel.findByIdAndUpdate(
		productId,
		objLimpio,
		{
			new: true,
			useFindAndModify: false
		}
	).then ( (mod) => {
		
		if (mod) {
			res.send({
				
				message: `Product: ${mod._id} Title: ${mod.title} has been updated.`
			});
		} else {
			res.status(404);
			res.send({
				errorCode: "product_update_1",
				error: `Product with id ${productId} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	

};

const deleteProduct = async (req, res) => {
	
	let productId = req.query.id;
	
	
	// Busco al usuario y lo borro
	ProductModel.findByIdAndDelete(
		productId
	).then ( (cadaver) => {
		
		if (cadaver) {
			res.send({
				message: `Product: ${cadaver.productId} Title: ${cadaver.title} has been deleted.`
			});
		} else {
			res.status(404);
			res.send({
				errorCode: "product_delete_1",
				error: `Product with id ${productId} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	

};

const getAllProduct = async (req, res) => {

	ProductModel.find(
		{}
	).then( (products) => {
		res.send(products);
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getByOwner = async (req, res) => {

	let ownerId = req.query.ownerId;
	
	ProductModel.find(
		{ownerId: ownerId}
	).then( (products) => {
		res.send(products);
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getBestSellingProduct = async (req, res) => {
	let num;

	if (!req.query.limit) {
	 	num = 10;
	}else {
		num = parseInt(req.query.limit);
	}
	
	ProductModel.find(
		{isActive: true}
	).limit(num).sort({ timesSold : -1 })
	.then( (products) => {
		res.send(products);
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getEconomicProduct = async (req, res) => {
	
	let num;
	
	if (!req.query.limit) {
	 	num = 10;
	}else {
		num = parseInt(req.query.limit);
	}
	
	ProductModel.find(
		{isActive: true}
	).limit(num).sort({ price : 1 })
	.then( (products) => {
		res.send(products);
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getBestVotedProduct = async (req, res) => {
	
	let num;
	
	if (!req.query.limit) {
	 	num = 10;
	}else {
		num = parseInt(req.query.limit);
	}
	
	ProductModel.find(
		{isActive: true}
	).limit(num).sort({ rating : -1 })
	.then( (products) => {
		res.send(products);
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getProductCategory = async (req, res) => {
	
	let num;
	
	if (!req.query.limit) {
	 	num = 10;
	}else {
		num = parseInt(req.query.limit);
	}
	
	let category = req.query.cat;
	let excludeId = req.query.excludeId;
	
	try {
		
		let queryResult = ProductModel.find(
			{category: category}
		);
	
		if(excludeId) {
			queryResult = queryResult.where('_id').ne(excludeId);
		}
	
		let products = await queryResult.limit(num).sort({ timesSold : -1 });
		
		res.send(products);
	
	}catch (err) {
		console.log( err );
	}
	
	
	// ProductModel.find(
	// 	{category: category}
	// ).where('_id').ne(excludeId)
	// .limit(num).sort({ timesSold : -1 })
	// .then( (products) => {
	// 	res.send(products);
	// }).catch( (err) => {
	// 	console.log( err );
	// });
	
};

const getProduct = async (req, res) => {
	
	/*
		Queries:
			
			---> *NOTA: title, id y ownerId NO son combinables!
			
			
			* title (que contenga esas palabras)
				title=a	
				title=silla
				title=silla+negra
			
			* id
				id= <_id de mongo>
			
			* ownerId
				id= <_id de mongo>
			
			isActive (default true)
				isActive=false
			
			sort (default pa)
				sort=pa
				
				- pa: price ascendant
				- pd: price descendant
				- ra: rating ascendant
				- rd: rating descendant
				- tsa: times sold ascendant
				- tsd: times sold descendant
			
			limit (default 500)
				limit=20
				
			skip (default 0)
				skip=20
			
			category
				category=electron
				
			minPrice
				minPrice=100
			
			maxPrice
				maxPrice= 500
			
			.
		.
		
	*/
	
	
	
	// ----------------
	// Stage MATCH
	// ----------------
	
	let productId = req.query.id;
	let productTitle = req.query.title;
	let ownerId = ObjectId(req.query.ownerId);	
	
	stage_match = {
		// _id: "asjdlkjasdlkj",
		// title: "hola",
		// ownerId: "asdasd",
		// category: "electron"
	};
	
	
	switch (true) {
		
		case !!productId:
			stage_match._id = productId;
			stage_match.isActive = true;
		break;
		
		case !!productTitle:
			
			if (productTitle === "%any") {productTitle = ""};
			
			stage_match.title = {$regex: `.*${productTitle}.*`, $options: "i"};
			stage_match.isActive = true;
		break;
		
		case !!ownerId:
			stage_match.ownerId = ownerId;
			stage_match.isActive = true;
		break;
		
	};
	
	
	
	// Si hubiese filtro de activo, lo añado
	let isActive = req.query.cateisActivegory;
	
	if (isActive) {
		stage_match.isActive = (isActive == "true");
	};
	
	
	// Si hubiese filtro de categoría, lo añado
	let category = req.query.category;
	
	if (category) {
		stage_match.category = category;
	};
	
	
	// Si hubiese filtro de precios, lo añado
	let minPrice = req.query.minPrice;
	let maxPrice = req.query.maxPrice;	
	
	if (minPrice && maxPrice) {
		
		stage_match.price = {
			$gte: parseInt(minPrice),
			$lte: parseInt(maxPrice)
		};
		
	} else {
		
		if (minPrice) {
			stage_match.price = {
				$gte: parseInt(minPrice)
			};
		};
		
		if (maxPrice) {
			stage_match.price = {
				$lte: parseInt(maxPrice)
			};
		};
		
	};
	
	
	// ----------------
	// Stage SORT
	// ----------------
	
	let sort = req.query.sort;
	
	let stage_sort = {};
	
	
	if (sort) {
		switch (sort) {
			
			case "pa": 
				stage_sort.price = 1;
			break;
			case "pd":
				stage_sort.price = -1;
			break;
			
			case "ra":
				stage_sort.rating = 1;
			break;
			case "rd":
				stage_sort.rating = -1;
			break;
			
			case "tsa":
				stage_sort.timesSold = 1;
			break;
			case "tsd":
				stage_sort.timesSold = -1;
			break;
			
			default:
				stage_sort.price = -1;
			break;
			
		};
		
	} else {
		stage_sort.price = -1;
	};	
	
	
	
	// ----------------
	// Stage LIMIT
	// ----------------
	
	let limit = req.query.limit;	
	
	stage_limit = 500;
	
	
	if (limit) {
		stage_limit = parseInt(limit);
	};
	
	
	
	// ----------------
	// Stage SKIP
	// ----------------
	
	let skip = req.query.skip;	
	
	stage_skip = 0;
	
	
	if (skip) {
		stage_skip = parseInt(skip);
	};
	
	
	
	// ----------------
	// Finalizo
	// ----------------
	
	ProductModel.aggregate([
		
		{ $match: stage_match },
		{ $sort: stage_sort },
		{ $skip: stage_skip },
		{ $limit: stage_limit },
		
		{ $lookup:
			{
				from: "users",
				localField: "ownerId",
				foreignField: "_id",
				as: "__ownerUsername"
			}
		},
		{ $unwind: "$__ownerUsername"},
		{ $addFields: {
				_ownerUsername: "$__ownerUsername.username"
			}
		},
		
		
		
		{ $lookup:
			{
				from: "ratings",
				localField: "ownerId",
				foreignField: "ratedId",
				as: "__karma"
			}
		},
		{ $addFields:
			{
				_totalKarma: {$sum: "$__karma.value"}
			}
		},
		
		
		
		{ $project:
			{
				__ownerUsername: 0,
				__karma: 0
			}
		}
		
	]).then( (products) => {
		
		if (products) {
			res.send(products);
		} else {
			res.send({message: `Products not found.`});
		}
		
	}).catch( (err) => {
		console.log( err );
	});
		
	
	
};

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	getAllProduct,
	getByOwner,
	getBestSellingProduct,
	getBestVotedProduct,
	getEconomicProduct,
	getProductCategory,
	getProduct
};