const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongooseExtend = require(process.env.CORE_LAYER + 'utils/mongooseExtend');
const client = require('./client');

const parentSchema = mongooseExtend.extendSchema(client.schema,
    {
        students: [client.schema]
    }
);

module.exports.model = mongooseExtend.loadModel('parents', parentSchema)
module.exports.schema = parentSchema
