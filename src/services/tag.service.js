const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const tag = require('../models/tag');
const tagValidation = require('../validations/tag.validation');

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

module.exports.get = async function (identity, tagId, options) {
    let filter = {
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        },
        _id: mongoose.mongo.ObjectId(tagId)
    };

    return await mongoRepository.findOne(process.env.MONGODB, tag.model, filter, options);
}

module.exports.insert = async function (identity, body) {
    tagValidation.validateInsert(body)
    console.log(identity)
    let newTag = new tag.model({
        name: body.name,
        description: body.description,
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        }
    });

    return await mongoRepository.insertOne(process.env.MONGODB, newTag);
}

module.exports.update = async function (identity, body) {
    tagValidation.validateUpdate(body)

    let filter = {
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        },
        _id: mongoose.mongo.ObjectId(body._id)
    };

    let update = {
        name: body.name,
        description: body.description
    };

    console.log(filter, update)

    return await mongoRepository.updateOne(process.env.MONGODB, tag.model, filter, update);
}

module.exports.delete = async function (identity, tagId) {
    let filter = {
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        },
        _id: mongoose.mongo.ObjectId(tagId)
    };

    return await mongoRepository.deleteOne(process.env.MONGODB, tag.model, filter);
}
