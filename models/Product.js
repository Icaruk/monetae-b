
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const ProductSchema = mongoose.Schema({
	
	ownerId: {
		type: ObjectId
	},
	category: {
		type: Array
	},
	imageUrl: {
		type: Array
	},
	title: {
        type: String,
        required: true
	},
	description: {
		type: String,
		default: ""
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    timesSold: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    activeStock: {
        type: Number,
        default: 0,
        required: true
    },
    location: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: false
    }

	
});


const ProductModel = mongoose.model("rating", ProductSchema);
module.exports = ProductModel;