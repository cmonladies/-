const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('users', UserSchema);