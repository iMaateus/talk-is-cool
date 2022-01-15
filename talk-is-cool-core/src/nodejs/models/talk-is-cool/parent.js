const mongoose = require('mongoose');
const extend = require('../general/extendSchema');
const client = require('./client');

const parentSchema = extend.extendSchema(client.schema,
    {
        students: [client.schema]
    }
);

module.exports.model = mongoose.model('parents', parentSchema)
module.exports.schema = parentSchema
