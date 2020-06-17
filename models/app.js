const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appSchema = new Schema({
	userkey: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	data: []
}, {timestamps: true});

module.exports = mongoose.model("App", appSchema);