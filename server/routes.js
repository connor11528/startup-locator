var express = require('express'),
	path = require('path'),
	fs = require('fs'),
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
			page: page
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

// ROUTES
module.exports = function(app){
	// get statups by page from angel.co
	apiRouter.get('/startups/:page', function(req, res){

		getSFStartups(req.params.page).then(function(startups){
			var startupList = JSON.parse(startups)['startups'];
			var leanStartupList = filterStartups(startupList);
			res.json(leanStartupList);
		});
	});



	// angularjs catch all route
	router.get('/*', function(req, res) {
		res.sendFile(rootPath + 'public/index.html', { user: req.user });
	});

	app.use('/api', apiRouter);	// haven't built any api yet
	app.use('/', router);
};


// only give the properties we care about
function filterStartups(startupList){
	var filteredList = [];
	for(var i = 0, len = startupList.length; i < len; i++){
		var startup = startupList[i];

		filteredList.push({
			id: startup.id,
			name: startup.name,
			angellist_url: startup.angellist_url,
			logo_url: startup.logo_url,
			thumb_url: startup.thumb_url,
			high_concept: startup.high_concept,
			product_desc: startup.product_desc,
			company_url: startup.company_url,
			company_size: startup.company_size
		});
	}

	return filteredList;	
}
