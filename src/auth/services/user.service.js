const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const token = require(process.env.CORE_LAYER + 'utils/token');
const user = require(process.env.CORE_LAYER + 'models/talk-is-cool/user');
const parent = require(process.env.CORE_LAYER + 'models/talk-is-cool/parent');
const student = require(process.env.CORE_LAYER + 'models/talk-is-cool/student');

getClientByEmail = async function (email, isParent, options) {
    let filter = {
        email: { '$regex': '^' + email + '$', $options: 'i' }
    }

    if (isParent == null) {
        return await mongoRepository.findOne(process.env.MONGODB, user.model, filter, options);
    } else if (isParent) {
        return await mongoRepository.findOne(process.env.MONGODB, parent.model, filter, options);
    } else {
        return await mongoRepository.findOne(process.env.MONGODB, student.model, filter, options);
    }
}

module.exports.generateToken = async function (email, isParent, options) {
    let user = await getClientByEmail(email, isParent, options);

    if (!user) {
        throw new httpError(401, "Invalid credentials");
    }

    return token.createToken(user);
}