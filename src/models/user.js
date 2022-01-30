const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongooseExtend = require(process.env.CORE_LAYER + 'utils/mongooseExtend');
const client = require('./client');
const tag = require('./tag');

const userSchema = mongooseExtend.extendSchema(client.schema,
    {
        webAccess: Boolean,
        mobileAccess: String,
        tags: [tag.schema],
    }
);

module.exports.model = mongooseExtend.loadModel('users', userSchema)
module.exports.schema = userSchema
