const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const school = require('./school');

const tagSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        school: school.schema
    },
    {
		timestamps: true,
	}
);

tagSchema.pre('save', function(next) {
    this.set('school', {
        _id: false,
        timestamps: false
    });
    next();
});

module.exports.model = mongoose.model('tags', tagSchema)
module.exports.schema = tagSchema
