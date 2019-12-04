
const mongoose = require("mongoose");


const PurchaseSchema = mongoose.Schema({
	
	buyerId: {
		type: ObjectId
    },
    sellerId: {
		type: ObjectId
	},
	date: {
        type: Date,
        default: () => Date.now()
	},
	originCity: {
		type: Array
	},
	originCountry: {
        type: String
    },
	destinationCity: {
        type: String
    },
    destinationCountry: {
        type: String
    },
    items: {
		type: Array,
	},
    values: {
        type: Array,
    },
    totalValue: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    }
});


const PurchaseModel = mongoose.model("rating", PurchaseSchema);
module.exports = PurchaseModel;