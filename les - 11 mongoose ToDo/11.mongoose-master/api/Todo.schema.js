const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
	title: { type: String, required: true, trim: true },
	description: String,
	status: { type: Boolean, default: true },
	closeDate: { type: Date },
	userId: {
		type: Schema.ObjectId,
		ref: "users"
	}
});

module.exports = mongoose.model('todo', TodoSchema);