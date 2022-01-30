const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const event = require('../models/event');
const eventValidation = require('../validations/event.validation');

module.exports.search = async function (identity, options) {
    let filter = {
        'school._id': mongoose.mongo.ObjectId(identity.schoolId)
    };

    if (options.search != null) {
        filter.name = { '$regex': options.search, '$options': 'i' }
    }

    return await mongoRepository.findMany(process.env.MONGODB, event.model, filter, options);
}

module.exports.get = async function (identity, eventId, options) {
    let filter = {
        'school._id': mongoose.mongo.ObjectId(identity.schoolId),
        '_id': mongoose.mongo.ObjectId(eventId)
    };

    return await mongoRepository.findOne(process.env.MONGODB, event.model, filter, options);
}

module.exports.insert = async function (identity, body) {
    eventValidation.validateUpsert(body)
    
    let newEvent = new event.model({
        name: body.name,
        description: body.description,
        date: body.date,
        endDate: body.endDate,
        type: body.type,
        school: {
            _id: mongoose.mongo.ObjectId(identity.schoolId)
        },
        tags: body.tags
    });

    return await mongoRepository.insertOne(process.env.MONGODB, newEvent);
}

module.exports.update = async function (identity, body) {
    eventValidation.validateUpsert(body, true)

    let filter = {
        'school._id': mongoose.mongo.ObjectId(identity.schoolId),
        '_id': mongoose.mongo.ObjectId(body._id)
    };

    let update = {
        name: body.name,
        description: body.description,
        date: body.date,
        endDate: body.endDate,
        type: body.type,
        tags: body.tags
    };

    return await mongoRepository.updateOne(process.env.MONGODB, event.model, filter, update);
}

module.exports.delete = async function (identity, eventId) {
    let filter = {
        'school._id': mongoose.mongo.ObjectId(identity.schoolId),
        '_id': mongoose.mongo.ObjectId(eventId)
    };

    return await mongoRepository.deleteOne(process.env.MONGODB, event.model, filter);
}
