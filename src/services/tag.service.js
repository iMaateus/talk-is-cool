const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const tag = require('../models/tag');

module.exports.search = async function (identity, options) {
    let filter = {
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        },
    };

    if (options.search != null) {
        filter.name = { '$regex': options.search, '$options': 'i' }
    }

    return await mongoRepository.findMany(process.env.MONGODB, tag.model, filter, options);
}
