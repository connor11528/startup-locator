var express = require('express'),
	path = require('path'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	router = express.Router();

var request = require('request');

// Angel List
var clientID = '99621002550b869e464121068a50078e8e8f51551073730d';
var clientSecret = '9c8041f3170793334285c07f0bc9429f5c7ca9689df06120';
var myToken = 'ef9bede1b98f2c2b8ff6ff1ad10f9ef40d270ef2d457cc82';

request.get('https://api.angel.co/1/search', {
	form: {
		access_token: myToken,
    	query: 'San Francsico'
	}
}, function(error, response, body){
	console.log(body)
});


module.exports = function(app){	

	// angularjs catch all route
	router.get('/*', function(req, res) {
		res.sendFile(rootPath + 'public/index.html', { user: req.user });
	});

	app.use('/api', apiRouter);	// haven't built any api yet
	app.use('/', router);
};