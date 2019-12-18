
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

	ProductModel.find(
		{category: category}
	).where('_id').ne(excludeId)
	.limit(num).sort({ timesSold : -1 })
	.then( (products) => {
		res.send(products);
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getProduct = async (req, res) => {

	let productId = req.query.id;
	let productTitle = req.query.title;
	let ownerId = ObjectId(req.query.ownerId);
	
	
	if (productTitle) {
		
		// Filtros
		let minPrice = req.query.minPrice;
		let maxPrice = req.query.maxPrice;
		let sort = req.query.sort; // pa, pd, va, vd
		
		
		let objSort = {};
		
		
		if (sort) {
			
			switch (sort) {
				
				case "pa": 
					objSort.price = 1;
				break;
				case "pd": 
					objSort.price = -1;
				break;
				case "va": 
					objSort.rating = 1;
				break;
				case "vd": 
					objSort.rating = -1;
				break;
				
			};
			
		};
		
		
		ProductModel.find(
			{
				title: {$regex: `.*${productTitle}.*`, $options: "i"},
				isActive: true
			},
		)
		.sort( objSort )
		.then( (products) => {
			
			if (products) {
				res.send(products);
			} else {
				res.send({message: `Products not found.`});
			}
			
		}).catch( (err) => {
			console.log( err );
		});
		
		
		
	} else if (productId) {
		
		ProductModel.find(
			{_id: productId}
		).then( (products) => {
			
			if (products) {
				res.send(products);
			} else {
				res.send({message: `Products not found.`});
			}
			
		}).catch( (err) => {
			console.log( err );
		});
		
		
		
	} else if (ownerId) {
		
		ProductModel.find(
			{ownerId: ownerId}
		).then( (products) => {
			
			if (products) {
				res.send(products);
			} else {
				res.send({message: `Products not found.`});
			}
			
		}).catch( (err) => {
			console.log( err );
		});
		
	};
	
	
};

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	getAllProduct,
	getBestSellingProduct,
	getBestVotedProduct,
	getProductCategory,
	getProduct
};