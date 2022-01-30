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

talkLikesSchema.pre('save', function (next) {
    this.set('user', {
        _id: false,
        timestamps: false
    });

    this.set('talk', {
        _id: false,
        timestamps: false
    });

    next();
});

module.exports.model = mongooseExtend.loadModel('talkLikes', talkLikesSchema)
module.exports.schema = talkLikesSchema
