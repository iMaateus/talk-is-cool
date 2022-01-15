const mongoose = require('mongoose');
const address = require('./address');

const schoolSchema = new mongoose.Schema(
    {
        name: String,
        cnpj: String,
        email: String,
        branding: String,
        address: address.schema
    },
    {
		timestamps: true,
	}
);

module.exports.model = mongoose.model('schools', schoolSchema)
module.exports.schema = schoolSchema
