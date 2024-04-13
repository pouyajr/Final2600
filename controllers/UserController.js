//Includes CRUD operations
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User')
const session = require('express-session');
const Order = require('../models/Order')
const PaymentFactory = require('../views/js/paymentFactory');
const fetch = require("node-fetch");

router.use(session({
	secret: 'your-secret-key',
	resave: false,
	saveUninitialized: true
}));

router.get('/signup', (req, res, next) => {
	res.status(200).render('userSignup');
})

//Create Operation
router.post('/signup', async (req, res, next) => {
	const { name, email, password } = req.body;
	if (name && email && password) {
		const existing = await User.findOne({ email: email });
		if (existing) {
			return res.status(400).json({ "message": "user with this email exists" });
		}
		const user = await User.create({ name, email, password });
		return res.redirect('/user/login');
	}

	return res.status(400).json({ "message": "please fill all fields" });
})

router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	if (email && password) {
		const user = await User.findOne({ email: email })
		if (user) {
			if (user.password == password) {
				req.session.userId = user._id;
				return res.redirect('/user/books');
			}

			return res.status(400).json({ "message": "wrong credentials" });

		}
		return res.status(401).json({ "message": "unauthorized" });
	}

	return res.status(401).json({ "message": "unauthorized" });
})

//Read Operation
router.get('/login', (req, res, next) => {
	res.status(200).render('userLogin');
})
//Read Operation
router.get('/cart', async (req, res, next) => {
	const userId = req.session.userId;
	if (!userId) {
		return res.redirect('/user/login');
	}
	else {
		const user = await User.findById(userId).populate('cart');
		if (user) {
			return res.render('cart', { cart: user.cart });
		}
		return res.status(500).json({ "message": "There was a problem fetching cart" })
	}
})
//Read Operation
router.get('/books', async (req, res, next) => {
	const books = await Book.find();
	const userId = req.session.userId;
	if (!userId) {
		return res.redirect('/user/login');
	}

	return res.status(200).render('Books', { books: books, userId: userId });
})
//Read Operation
router.get('/signout', async (req, res, next) => {
	req.session.userId = null;
	return res.redirect('/user/login');
})

//Create Operation
router.post('/cart', async (req, res, next) => {
	const { userId, bookId } = req.body;

	if (userId && bookId) {
		const user = await User.findById(userId);
		if (user) {
			user.cart.push(bookId);
			await user.save();
			return res.json(user);
		}

		return res.status(500).json({ "message": "There was a problem adding item in cart" })
	}

	return res.status(400).json({ "message": "There was a problem adding item in cart" });
})
//Update Operation
//Delete Operation
router.delete('/cart', async (req, res, next) => {
	const { userId, bookId } = req.body;

	if (userId && bookId) {
		try {
			const user = await User.findById(userId);
			if (user) {
				user.cart.pull(bookId);
				await user.save();
				return res.json(user);
			}
			return res.status(404).json({ "message": "User not found" });
		} catch (error) {
			console.error('Error removing item from cart:', error);
			return res.status(500).json({ "message": "There was a problem removing item from cart" });
		}
	}

	return res.status(400).json({ "message": "Invalid request parameters" });
});

//Create Operation
router.post('/order', async (req, res, next) => {
	const userId = req.session.userId;
	if (!userId) {
		return res.redirect('/user/login');
	}

	const paymentType = req.body.paymentType;

	try {
		const user = await User.findById(userId).populate('cart');
		if (!user) {
			return res.status(404).json({ "message": "User not found" });
		}
		let total = 0;
		user.cart.forEach(item => {
			total += item.price;
		});

		const paymentProcessor = PaymentFactory.createPayment(paymentType);
        paymentProcessor.process(total);

		const order = new Order({
			date: new Date(),
			customer: userId,
			total: total,
			books: user.cart.map(item => item._id) 
		});

		await order.save();

		user.cart = [];
		await user.save();

		res.redirect('/user/books'); 
	} catch (error) {
		console.error("Error placing order:", error);
		res.status(500).json({ "message": "Internal server error" });
	}
});
//Read Operation
router.get('/orders', async (req, res, next) => {
	const userId = req.session.userId;
	if (!userId) {
		return res.redirect('/user/login');
	}
	const orders = await Order.find({ customer: userId }).populate('books').populate('customer')
	return res.render('userOrder', { orders })
})
//Read Operation
//Server-Side Restful APIs
router.get('/weather', async (req, res, next) => {
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=canada`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '9cc91d7742mshe015120a23ac8b4p13e8d7jsn4a1d23de0b00',
			'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
		}
	};

	try {
		let response = await fetch(url, options);
		response = await response.json();  
		return res.json({temp: response.current.temp_c, country: response.location.country}); 
	} catch (error) {
		console.error(error);
	}
})

module.exports = router; 