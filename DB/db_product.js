
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

const editProduct = async () => {
	
	let productId = req.body.productId;
	

	// Esta movida se haría en el front
	// Aquí recibiríamos objLimpio 
	let objLimpio = {};
	let arr = ["imageUrl", "title", "description", "price", "stock", "activeStock", "isActive"];
	
	for (let _x of arr) {
		if (req.body[_x]) {
			objLimpio[_x] = _x;
		};
	};
	
	
	
	// Busco al usuario y lo updateo
	ProductModel.findByIdAndUpdate(
		productId,
		obj,
		{
			new: true,
			useFindAndModify: false
		}
	).then ( (cadaver) => {
		
		if (cadaver) {
			res.send({
				message: `Product: ${cadaver.productId} Title: ${cadaver.title} has been updated.`
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

const deleteProduct = async () => {

	let productId = req.params.productId;
	
	
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


module.exports = {
	addProduct,
	deleteProduct,
	editProduct
	
};