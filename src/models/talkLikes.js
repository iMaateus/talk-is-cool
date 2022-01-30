const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongooseExtend = require(process.env.CORE_LAYER + 'utils/mongooseExtend');
const user = require('./user');
const talk = require('./talk');

const talkLikesSchema = new mongoose.Schema(
    {
        user: user.schema,
        talk: talk.schema,
    },
    {
        timestamps: true,
    }
);

module.exports.model = mongooseExtend.loadModel('talkLikes', talkLikesSchema)
module.exports.schema = talkLikesSchema
