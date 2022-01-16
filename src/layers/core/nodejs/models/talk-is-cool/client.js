const mongoose = require('mongoose');
const school = require('./school');

const clientSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        photo: String,
        role: String,
        phone: String,
        note: String,
        token: Number,
        active: Boolean,
        school: school.schema
    },
    {
		timestamps: true,
	}
);

module.exports.schema = clientSchema
