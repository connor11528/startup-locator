
var mongoose = require('mongoose');

// email, pwd are required
// email must be unique
// don't send password with requests

var userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true },
	password: {type: String, required: true, select: false },
	admin: Boolean,
	favorites: [{type : mongoose.Schema.ObjectId, ref : 'Startup'}]
});


module.exports = mongoose.model('User', userSchema);