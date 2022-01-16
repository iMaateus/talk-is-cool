const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const extend = require(process.env.CORE_LAYER + 'utils/extendSchema');
const client = require('./client');

const studentSchema = extend.extendSchema(client.schema,
    {
        parents: [client.schema]
    }
);

module.exports.model = mongoose.model('students', studentSchema)
module.exports.schema = studentSchema
