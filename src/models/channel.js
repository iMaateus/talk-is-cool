const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const school = require('./school');
const user = require('./user');

const channelSchema = new mongoose.Schema(
    {
        name: String,
        school: school.schema,
        members: [user.schema]
    },
    {
        timestamps: true,
    }
);

module.exports.model = mongoose.model('channels', channelSchema)
module.exports.schema = channelSchema
