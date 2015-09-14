var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/startup-locator',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'mongodb://heroku_9dv8v085:vjldaitqtc7lhjgec03ho0269e@ds053469.mongolab.com:53469/heroku_9dv8v085',
		port: process.env.PORT || 80
	}
};