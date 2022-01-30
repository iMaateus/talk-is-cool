const mongoose = require(process.env.CORE_LAYER_MODULE + 'mongoose');
const mongooseExtend = require(process.env.CORE_LAYER + 'utils/mongooseExtend');
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

module.exports.model = mongooseExtend.loadModel('channels', channelSchema)
module.exports.schema = channelSchema
