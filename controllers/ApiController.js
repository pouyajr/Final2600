//Server-side RESTful APIs
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/books', async (req, res, next) => {
	const books = await Book.find();	
	return res.status(200).json({
        status: "success",
        data: books
    })
})



module.exports = router; 