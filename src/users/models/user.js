const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const extend = require(process.env.CORE_LAYER + 'utils/extendSchema');
const client = require('./client');
const tag = require('../../tags/models/tag');

const userSchema = extend.extendSchema(client.schema,
    {
        webAccess: Boolean,
        mobileAccess: String,
        tags: [tag.schema],
    }
);

module.exports.model = mongoose.model('users', userSchema)
module.exports.schema = userSchema
