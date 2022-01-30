const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongooseExtend = require(process.env.CORE_LAYER + 'utils/mongooseExtend');
const client = require('./client');

const studentSchema = mongooseExtend.extendSchema(client.schema,
    {
        parents: [client.schema]
    }
);

module.exports.model = mongooseExtend.loadModel('students', studentSchema)
module.exports.schema = studentSchema
