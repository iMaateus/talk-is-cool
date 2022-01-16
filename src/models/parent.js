const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const extend = require(process.env.CORE_LAYER + 'utils/extendSchema');
const client = require('./client');

const parentSchema = extend.extendSchema(client.schema,
    {
        students: [client.schema]
    }
);

module.exports.model = mongoose.model('parents', parentSchema)
module.exports.schema = parentSchema
