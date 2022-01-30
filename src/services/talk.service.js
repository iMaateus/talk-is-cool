const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const s3service = require(process.env.CORE_LAYER + 'services/s3.service');
const talk = require('../models/talk');
const talkLikes = require('../models/talkLikes');

module.exports.search = async function (identity, options, me = false) {
    let filter = {
        'school._id': mongoose.mongo.ObjectId(identity.schoolId),
        'published': true
    };

    if (me) {
        filter['user._id'] = mongoose.mongo.ObjectId(identity.id)
    }

    let talks = await mongoRepository.findMany(process.env.MONGODB, talk.model, filter, options);
    talks = await setS3Urls(talks, process.env.TALKS_BUCKET)

    filter = {
        'user._id': mongoose.mongo.ObjectId(identity.id),
        'talk._id': { $in: talks.flatMap(talk => mongoose.mongo.ObjectId(talk._id)) }
    };

    let likes = await mongoRepository.findMany(process.env.MONGODB, talkLikes.model, filter);

    return talks.map(talk => ({...talk._doc, liked: likes.some(like => like.talk._id.toString() == talk._id.toString())}))
}

async function setS3Urls(object, bucket) {
    if (Array.isArray(object)) {
        for (let item of object) {
            if (item.type == "picture" && item.midia) {
                item.midia = await s3service.getSignedUrl(bucket, item.midia, 3600)
            }

            if (item.attachments) {
                for (let attachment of item.attachments) {
                    attachment.key = await s3service.getSignedUrl(bucket, attachment.key, 3600)
                }
            }
        }
    } else {
        if (object.type == "picture" && object.midia) {
            object.midia = await s3service.getSignedUrl(bucket, object.midia, 3600)
        }

        if (object.attachments) {
            for (let attachment of object.attachments) {
                attachment.key = await s3service.getSignedUrl(bucket, attachment.key, 3600)
            }
        }
    }

    return object;
}
