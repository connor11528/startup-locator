
var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require("fs"));
// fs.readFileAsync("./startups.json", "utf8")
// .then(function (startups) {
//     var sups = JSON.parse(JSON.stringify(startups));
//     console.log(sups)
// }).catch(SyntaxError, function (e) {
//     console.error("file contains invalid json");
// }).catch(Promise.OperationalError, function (e) {
//     console.error("unable to read file, because: ", e.message);
// });


var request = Promise.promisifyAll(require("request"));
// var myToken = 'ef9bede1b98f2c2b8ff6ff1ad10f9ef40d270ef2d457cc82';
// var friscoLocationTag = '1692';

// var pageToGet = 1;
// getSFStartups(pageToGet).then(function(startupsRes){
// 	var resObj = JSON.parse(startupsRes);
// 	var startups = resObj.startups;

// 	startups.forEach(function(startup){
// 		var url = startup.crunchbase_url;
// 		console.log(url);
// 		if(url !== null){
// 			scrapeCrunchbase(url);
// 		}
// 	});
// });

// function getSFStartups(page){
// 	var dfd = Promise.defer();
// 	request.get({
// 		url: 'https://api.angel.co/1/tags/' + encodeURIComponent(friscoLocationTag) + '/startups', 
// 		qs: {
// 			access_token: myToken,
// 			order: 'popularity',
// 			page: JSON.stringify(page)
// 		},
// 		method: 'GET'
// 	}, function(error, response, body){
// 		dfd.resolve(body);
// 	});
// 	return dfd.promise;
// }


// web scraper
var cheerio = require('cheerio');
function scrapeCrunchbase(url){
	request(url, function(headers, res){
		var $ = cheerio.load(res.body);
		var addresses = $('.addresses > .full');
		addresses.map(function(i, el){
			console.log(i)
			console.log(el);
		});
	});

}

scrapeCrunchbase('http://www.crunchbase.com/organization/square');



