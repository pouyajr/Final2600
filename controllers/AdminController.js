//Module Design Pattern
//AdminController that will be used for the administration usage 
//Contains CRUD operation 
const express = require('express');
const router = express.Router();
const config = require('../server/config/config');
const session = require('express-session');
const Book = require('../models/Book');
const Order = require('../models/Order');

router.use(session({
	secret: 'your-secret-key',
	resave: false,
	saveUninitialized: true
}));

router.post('/login', (req, res, next) => {
	const { username, password } = req.body;

	if (username == config.ADMIN_USERNAME && password == config.ADMIN_PASSWORD) {
		req.session.admin = true;
		return res.redirect('/admin/books')
	}
	else {
		return res.status(400).json({ "message": "wrong credentials" });
	}
})

router.get('/signout', (req, res, next) => {
	req.session.admin = null;
	return res.redirect('/admin/login');
})

router.get('/login', (req, res, next) => {
	return res.render('adminLogin');
})

router.get('/books', async (req, res, next) => {
	if (req.session.admin) {
		const books = await Book.find();
		return res.render('adminPage', { books })
	}
	else {
		return res.redirect('/admin/login')
	}
})

router.post('/book', async (req, res, next) => {
	if (req.session.admin) {
		const { Name, Author, ISBN, price, description } = req.body;
		const book = await Book.create({ Name, Author, ISBN, price, description });
		return res.json(book);
	}
	else {
		return res.redirect('/admin/login')
	}
})

router.get('/orders', async (req, res, next) => {
	if (req.session.admin) {
		const orders = await Order.find().populate('books').populate('customer');
		return res.render('adminOrder', { orders });
	}
	else {
		return res.redirect('/admin/login')
	}
})

module.exports = router; 