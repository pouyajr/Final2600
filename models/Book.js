//Book Schema to store in MongoDB
const mongoose = require('mongoose'); 

const BookSchema = new mongoose.Schema({
	Name: String, 
	ISBN: String, 
	Author: String, 
	price: Number, 
	description: String
})
const Book = mongoose.model('book', BookSchema); 

module.exports = Book; 