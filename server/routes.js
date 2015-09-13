var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	apiRouter = express.Router(),
	router = express.Router(),
	jwt = require('jsonwebtoken'),
	utils = require('./utils'),
	rootPath = path.normalize(__dirname + '/../'),
	User = require('./models/user'),
	Startup = require('./models/startup');

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
		var perPage = 50
    	var page = (parseInt(req.params.page) > 0) ? parseInt(req.params.page) : 0;

		Startup
			.find({})
			.limit(perPage)
			.skip(perPage * page)
			.sort({ name: -1 })
			.exec(function(err, startups){
				if(err) throw err;

				Startup.count().exec(function(err, count){
					res.json({
						startups: startups,
						page: page,
						pages: count/perPage
					});
				});
			});
		
		// getSFStartups(req.params.page).then(function(startups){
		// 	var startupList = JSON.parse(startups)['startups'];
		// 	var leanStartupList = filterStartups(startupList);
		// 	res.json(leanStartupList);
		// });
	});

	// favorite a startup
	apiRouter.get('/favorite/:angelId', function(req, res){
		var user_id = req.query.user_id;

		// find matching startup
		var startupQuery = Startup.findOne({ id: req.params.angelId });
		startupQuery.exec(function(err, startup){

			// find user
			var userQuery = User.findOne({ _id: user_id });
			userQuery.exec(function(err, user){

				if (user.favorites.indexOf(startup) == -1) {

					// add to favorites
					user.favorites.push(startup);
					user.save(function(err, user){
						res.json(user);
					});
				} else {
					res.json({ error: 'Already favorited that startup' });
				}
			});
		});
	});

	// unfavorite a startup
	apiRouter.get('/unfavorite/:angelId', function(req, res){
		var user_id = req.query.user_id;

		// find matching startup (in the future get this from request)
		var startupQuery = Startup.findOne({ id: req.params.angelId });

		startupQuery.exec(function(err, startup){
			var userQuery = User.findOne({ _id: user_id });
			userQuery.exec(function(err, user){

				var index = user.favorites.indexOf(startup);
				user.favorites.splice(index, 1);

				// save changes
				user.save(function(err, user){
					res.json(user);
				});
			});

		});
	});

	// add user
	apiRouter.post('/users', function(req, res){

		utils.hashPwd(req.body.password).then(function(hashedPwd){

			var newUser = new User({
				email: req.body.email,
				password: hashedPwd,
				admin: false
			});

			newUser.save(function(err){
				if(err) throw err;

				// create token
				var token = jwt.sign(newUser, app.get('superSecret'), { expiresInminutes: 1440 });

				newUser.password = undefined;
				
				// send token
				res.json({
					success: true,
					message: 'Successfully authenticated!',
					token: token,
					user: newUser
				});
			});
		});
		
	});

	// authenticate user
	apiRouter.post('/users/auth', function(req, res){

		// TODO: handle if user does not exist

		// add back the password field for this query
		var query = User.findOne({
			email: req.body.email
		}).select('_id email +password favorites admin');

		query.exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.json({ success: false, message: 'No user with that email' });
			} else if(user){

				// check password
				utils.comparePwd(req.body.password, user.password).then(function(isMatch){
					if(!isMatch){
						res.json({ success: false, message: 'Wrong password' });
					} else {

						// create token
						var token = jwt.sign(user, app.get('superSecret'), { expiresInminutes: 1440 });

						user.password = undefined;

						// send token
						res.json({
							success: true,
							message: 'Successfully authenticated!',
							token: token,
							user: user
						});
					}
				});
			}
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
