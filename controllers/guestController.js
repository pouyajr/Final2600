//Module Design
const express = require('express');
const router = express.Router();
const config = require('../server/config/config');
const Book = require('../models/Book');

router.get('/books', async(req, res, next)=>{
	const books = await Book.find(); 
	return res.render('guestPage', {books}); 
})

module.exports = router; 