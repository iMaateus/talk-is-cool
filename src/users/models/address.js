const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');

const addressSchema = new mongoose.Schema(
    {
        zipcode: String,
        state: String,
        city: String,
        neighborhood: String,
        street: String
    },
    {
        _id : false,
        timestamps: false,
    }
);

module.exports.schema = addressSchema
