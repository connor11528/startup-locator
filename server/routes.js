var express = require('express'),
	path = require('path'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	router = express.Router();

var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

// Angel List
var clientID = '99621002550b869e464121068a50078e8e8f51551073730d';
var clientSecret = '9c8041f3170793334285c07f0bc9429f5c7ca9689df06120';
var myToken = 'ef9bede1b98f2c2b8ff6ff1ad10f9ef40d270ef2d457cc82';
var friscoLocationTag = '1692';

// search for location tags
// function searchforLocationTag(location){
// 	var dfd = Promise.defer();
// 	request.get('https://api.angel.co/1/search', {
// 		form: {
// 			access_token: myToken,
// 	    	query: encodeURIComponent(location),
// 	    	type: 'LocationTag'
// 		}
// 	}, function(error, response, body){
// 		dfd.resolve(body);
// 	});
// 	return dfd.promise;
// }

// get startups in SF
function getSFStartups(page){
	var dfd = Promise.defer();
	request.get({
		url: 'https://api.angel.co/1/tags/' + encodeURIComponent(friscoLocationTag) + '/startups', 
		qs: {
			access_token: myToken,
			order: 'popularity',
			page: JSON.stringify(page)
		},
		method: 'GET'
	}, function(error, response, body){
		dfd.resolve(body);
	});
	return dfd.promise;
}

// search for startup by name
function searchStartupByName(name){
	var dfd = Promise.defer();
	request.get('https://api.angel.co/1/search', {
		form: {
			access_token: myToken,
	    	query: encodeURIComponent(name),
	    	type: 'Startup'
		}
	}, function(error, response, body){
		dfd.resolve(body);
	});
	return dfd.promise;
}

module.exports = function(app){
	// send back SF startups
	apiRouter.get('/startups', function(req, res){
		getSFStartups(1).then(function(startupsRes){
			var startups = JSON.parse(startupsRes);
			console.log(startups.startups.length)
			res.json(startups);
		});
	});

	// angularjs catch all route
	router.get('/*', function(req, res) {
		res.sendFile(rootPath + 'public/index.html', { user: req.user });
	});

	app.use('/api', apiRouter);	// haven't built any api yet
	app.use('/', router);
};