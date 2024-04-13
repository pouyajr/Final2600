const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
	name: String, 
	email: {
		type: String, 
		required: true, 
		unique: true
	}, 
	password: String, 
	cart: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'book'
	}]
})

const User = mongoose.model('user', UserSchema); 
module.exports = User; 