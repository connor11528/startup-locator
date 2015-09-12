
var mongoose = require('mongoose');

var startupSchema = new mongoose.Schema({
	id: Number,
	name: String,
	angellist_url: String,
	logo_url: String,
	thumb_url: String,
	high_concept: String,
	product_desc: String,
	company_url: String,
	company_size: String
});


mongoose.model('Startup', startupSchema);