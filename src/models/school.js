const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
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
