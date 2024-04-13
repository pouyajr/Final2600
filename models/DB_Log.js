//LOG file Schema to store in MongoDB
const mongoose = require('mongoose'); 

const DB_Log_schema = new mongoose.Schema({
	timeStamp: String, 
	method: String, 
	path: String, 
	query: {}, 
	statusCode: Number
})

const Db_Log = mongoose.model('db_log', DB_Log_schema); 
module.exports = Db_Log; 