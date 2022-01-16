const mongoose = require('mongoose');
const extend = require('../general/extendSchema');
const client = require('./client');
const tag = require('./tag');

const userSchema = extend.extendSchema(client.schema,
    {
        webAccess: Boolean,
        mobileAccess: String,
        tags: [tag.schema],
    }
);

module.exports.model = mongoose.model('users', userSchema)
module.exports.schema = userSchema

