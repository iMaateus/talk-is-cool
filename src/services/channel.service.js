const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const channel = require('../models/channel');

module.exports.search = async function (identity, options) {
    let filter = {
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        },
    };

    if (!identity.isAdmin && !identity.isClient) {
        filter.members = { $elemMatch: { _id: mongoose.mongo.ObjectId(identity.id) } }
    }

    return await mongoRepository.findMany(process.env.MONGODB, channel.model, filter, options);
}
