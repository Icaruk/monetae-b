
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = mongoose.Schema({
	
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	secretQuestion: String,
	secretAnswer: String,
	phone: {
		type: String,
		unique: false,
		required: true
	},
	billing: {
		type: Object,
		required: true,
		
		address: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		paypal: {
			type: String,
			required: true
		},
		card: {
			number: {
				type: Number,
				required: true
			},
			owner: {
				type: String,
				required: true
			},
			expireDate: {
				type: Array,
				required: true
			}
		}
	},
	adminLevel: {
		type: Number,
		default: 0
	},
	userType: {
		type: Number,
		required: true,
		default: 0
	}
	
});




// MW para crypto
UserSchema.pre("save", function (next) { // usamos function de ES5 porque queremos el this para acceder a la instancia
	
	const user = this;
	
	
	// Sólo encriptaré el campo password
	if (user.password) {
		
		bcrypt.hash(
			user.password, 10
		).then( hash => {
			user.password = hash;
			next();
		}).catch( err => {
			
			console.log( err );
			
			res.status(500);
			res.send(err);
			
		});
		
	};
	
	
});



const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;


