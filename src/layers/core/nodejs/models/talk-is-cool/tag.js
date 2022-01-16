const mongoose = require('mongoose');
const school = require('./school');

const tagSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        school: school.schema
    }
);

module.exports.model = mongoose.model('tags', tagSchema)
module.exports.schema = tagSchema
