var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	lastName: { type: String, default: '' }
});

module.exports = mongoose.model('Client', schema);