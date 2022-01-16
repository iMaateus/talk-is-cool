const mongoose = require('mongoose');
const extend = require('../general/extendSchema');
const client = require('./client');

const studentSchema = extend.extendSchema(client.schema,
    {
        parents: [client.schema]
    }
);

module.exports.model = mongoose.model('students', studentSchema)
module.exports.schema = studentSchema
