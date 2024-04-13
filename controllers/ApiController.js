//Server-side RESTful APIs
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET endpoint for '/books' which will handle incoming GET requests to fetch all books that are stored in DATABASE
router.get('/books', async (req, res, next) => {
	const books = await Book.find();	
	return res.status(200).json({
        status: "success",
        data: books
    })
})



module.exports = router; 