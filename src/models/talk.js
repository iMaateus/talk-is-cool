const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongooseExtend = require(process.env.CORE_LAYER + 'utils/mongooseExtend');
const school = require('./school');
const tag = require('./tag');
const attachment = require('./attachment');
const user = require('./user');

const talkSchema = new mongoose.Schema(
    {
        message: String,
        midia: String,
        type: String,
        attachments: [attachment.schema],
        user: user.schema,
        school: school.schema,
        tags: [tag.schema],
        likes: Number,
        published: Boolean,
        scheduledAt: Date
    },
    {
        timestamps: true,
    }
);

talkSchema.pre('save', function (next) {
    this.set('school', {
        _id: false,
        timestamps: false
    });

    this.set('user.tags', undefined, {
        strict: false
    });

    this.tags = this.tags.map(function (tag) {
        return {
            _id: tag._id,
            name: tag.name
        };
    });

    next();
});

module.exports.model = mongooseExtend.loadModel('talk', talkSchema)
module.exports.schema = talkSchema
