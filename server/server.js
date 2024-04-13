// The complete code of connecting to server(Node.js)
const express = require('express'); 
const path = require('path')
const app = express(); 
const config = require('./config/config'); 
const LogMiddleware = require('./middlewares/LogMiddleware'); 
const session = require('express-session');
const Database = require('./Utility/Database') 
const UserRouter = require('../controllers/UserController'); 
const AdminRouter = require('../controllers/AdminController'); 
const guestRouter = require('../controllers/guestController'); 
const apiRouter = require("../controllers/ApiController")
const bodyParser = require('body-parser'); 
const ejs = require('ejs')

const database = new Database; 
database.connectRemote(config.REMOTE_DB_USERNAME, config.REMOTE_DB_PASSWORD, config.REMOTE_DB_CLUSTER, config.REMOTE_DB_NAME); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../views')))
app.use(LogMiddleware); 

app.set('view engine', 'ejs');

app.use(session({
	secret: 'your-secret-key2',
	resave: false,
	saveUninitialized: true
}));

app.get('/', (req, res)=>{
	res.redirect('/guest/books'); 
})

app.use('/user', UserRouter); 
app.use('/admin', AdminRouter); 
app.use('/guest', guestRouter); 
app.use('/api', apiRouter); 


// not found page
app.use((req, res, next)=>{
	res.status(404).render('notfound'); 
})

app.listen(config.PORT, ()=>{
	console.log(`App running on port ${config.PORT}`); 
})