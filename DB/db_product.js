
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

const getProductByOwner = async (req, res) => {

	let ownerId = ObjectId(req.query.ownerId);

	ProductModel.find(
		{ownerId: ownerId}
	).then( (products) => {

		if(products){
			res.send(products);
		}else{
			res.send({message: `Products not found.`});
		}
		
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getIdProduct = async (req, res) => {

	let productId = req.query.id;

	ProductModel.find(
		{_id: productId}
	).then( (products) => {

		if(products){
			res.send(products);
		}else{
			res.send({message: `Products not found.`});
		}
		
	}).catch( (err) => {
		console.log( err );
	});
	
};

const getProductByTitle = async (req, res) => {

	let productTitle = req.query.title;


	console.log(productTitle);

	ProductModel.find(
		{title: productTitle}
	).then( (products) => {

		if(products){
			res.send(products);
		}else{
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
	getProductByOwner,
	getIdProduct,
	getProductByTitle
};