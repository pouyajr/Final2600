//File to find if the database is connected or not to either local or remote MongoDb database
const mongoose = require('mongoose'); 

// singleton desing pattern for database 
class Database{
	//connect to both local and remote MongoDB server
	constructor(){}; 
	connectLocal = async(url, options) => 
	{
		try 
		{
			await mongoose.connect(url, options);
			console.log('Local Database connected'); 
		}
		catch(error)
		{
			console.log('Error connecting database'); 
		}
	}

	connectRemote = async(username, password, clustername, db, options) => 
	{
		try 
		{
			const str = 'mongodb+srv://' + username + ':' + password + '@' + clustername + '.' + db + '.mongodb.net/'
			await mongoose.connect(str, options);
			console.log('remote Database connected'); 
		}
		catch(error)
		{
			console.log('Error connecting database'); 
		}
	}
}	

module.exports = Database; 