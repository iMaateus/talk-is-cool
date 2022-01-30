const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const school = require('./school');
const tag = require('./tag');

const eventSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        date: Date,
        endDate: Date,
        type: String,
        school: school.schema,
        tags: [tag.schema],
        notified: Boolean
    },
    {
        timestamps: true,
    }
);

eventSchema.pre('save', function (next) {
    this.set('school', {
        _id: false,
        timestamps: false
    });

    this.tags = this.tags.map(function (tag) {
        return { 
            _id: tag._id, 
            name: tag.name 
        };
    });

    next();
});

eventSchema.pre('updateOne', function (next) {
    this._update.tags = this._update.tags.map(function (tag) {
        return { 
            _id: tag._id, 
            name: tag.name 
        };
    });

    next();
});

module.exports.model = mongoose.model('events', eventSchema)
module.exports.schema = eventSchema
