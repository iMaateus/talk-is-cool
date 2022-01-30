const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');

const attachmentSchema = new mongoose.Schema(
    {
        key: String,
        name: String
    },
    {
        _id : false,
        timestamps: false,
    }
);

module.exports.schema = attachmentSchema
