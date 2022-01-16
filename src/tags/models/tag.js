const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const school = require('../../schools/models/school');

const tagSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        school: school.schema
    }
);

module.exports.model = mongoose.model('tags', tagSchema)
module.exports.schema = tagSchema
