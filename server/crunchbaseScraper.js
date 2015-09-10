
var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require("fs"));
// fs.readFileAsync("./startups.json", "utf8")
// .then(function (startups) {
//     var sups = JSON.parse(JSON.stringify(startups));
//     console.log(typeof sups)
// }).catch(SyntaxError, function (e) {
//     console.error("file contains invalid json");
// }).catch(Promise.OperationalError, function (e) {
//     console.error("unable to read file, because: ", e.message);
// });


var request = Promise.promisifyAll(require("request"));
var myToken = 'ef9bede1b98f2c2b8ff6ff1ad10f9ef40d270ef2d457cc82';
var friscoLocationTag = '1692';

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

getSFStartups(1).then(function(startupsRes){
	var startups = JSON.parse(startupsRes);
	console.log(Object.keys(startups));
});