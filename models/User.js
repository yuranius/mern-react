// для MangoDB в данном проекте не используется

const { Schema, model } = require("mongoose");

const schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},

	password: {
		type: String,
		required: true,
	},

});

module.exports = model("User", schema);

