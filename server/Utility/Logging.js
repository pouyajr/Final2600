const config = require('../config/config')
const Db_Log = require('../../models/DB_Log'); 
const path = require('path')
const fs = require('fs')

// singleton pattern for logging class 
class Logging 
{
	logFile(request)
	{
		let log = {}; 
        log.date = new Date()
        log.path = request.path
        log.method = request.method
		const logFilePath = path.resolve(__dirname, '../logs/node.log');
        fs.appendFile(logFilePath, JSON.stringify(log), (error) => {
            if (error)
                console.log(`Error appending to a file\n\t|${error}`)
            else
                console.info('File was appended successfully!')
        })
	}

	LogDatabase = async(obj) =>
	{
		const log = await Db_Log.create({
			timeStamp: obj.timeStamp, 
			method: obj.method, 
			path: obj.path, 
			query: obj.query, 
			statusCode: obj.statusCode
		})

		return log; 
	}
}

module.exports = Logging; 