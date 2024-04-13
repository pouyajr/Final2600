const mongoose = require('mongoose'); 

const OrderSchema = new mongoose.Schema({
	date: String, 
	customer : {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user'
	}, 
	books: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'book'
	}],
	paymentMethod: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'paymentMethod'
	},
	total: Number
})

const Order = mongoose.model('order', OrderSchema); 
module.exports = Order; 