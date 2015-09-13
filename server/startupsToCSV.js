
var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var writer = require('format-data')('csv');
var fs = require('fs-extra');

var myToken = 'ef9bede1b98f2c2b8ff6ff1ad10f9ef40d270ef2d457cc82';
var friscoLocationTag = '1692';

var rows = [];
for (var i = 1; i <= 287; i++){
	getSFStartups(i).then(function(startupsRes){
		var resObj = JSON.parse(startupsRes);
		var startups = resObj.startups;

		startups.forEach(function(startup, j){

			if(typeof startup.high_concept == 'string'){
				startup.high_concept = startup.high_concept.replace(/(\r\n|\n|\r)/gm,"");
			}

			if(typeof startup.product_desc == 'string'){
				startup.product_desc = startup.product_desc.replace(/(\r\n|\n|\r)/gm,"");
			}

			var row = {
				id: startup.id,
				name: startup.name,
				angellist_url: startup.angellist_url,
				logo_url: startup.logo_url,
				thumb_url: startup.thumb_url,
				high_concept: startup.high_concept,
				product_desc: startup.product_desc,
				company_url: startup.company_url,
				company_size: startup.company_size
			};
			console.log(row);

			writer.write(row);
			rows.push(row);
		});
	});
}

// for(var j = 0, len = rows.length; j < len; j++){
// 	writer.write(rows[j]);
// }

// write to file
var file = fs.createWriteStream('SFstartups.csv');
writer.pipe(file);


// Helper functions
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


