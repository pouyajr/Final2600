//module design pattern

const Logging = require('../Utility/Logging'); 
const logging = new Logging; 

const LogMiddleware = async (req, res, next) => {
    const requestLog = {
        timeStamp: new Date(),
        method: req.method,
        path: req.path,
        query: req.body,
        statusCode: null
    };

    const originalJson = res.json;

    res.json = async (body) => {
        requestLog.statusCode = res.statusCode;
        
        originalJson.call(res, body);

        await logData(requestLog);
    };

    const originalRender = res.render;

    res.render = async (view, options, callback) => {
        const renderCallback = async (err, html) => {
			requestLog.statusCode = res.statusCode;

            await logData(requestLog);
            if (typeof callback === 'function') {
                callback(err, html);
            }

			res.send(html);
        };

        originalRender.call(res, view, options, renderCallback);
    };

    next();
};

async function logData(requestLog) {
    logging.logFile(requestLog);

    await logging.LogDatabase(requestLog);
}

module.exports = LogMiddleware;
