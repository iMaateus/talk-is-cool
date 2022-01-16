const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');
const mongoRepository = require(process.env.CORE_LAYER + 'repository/mongo.repository');
const token = require(process.env.CORE_LAYER + 'security/token');
const cryptography = require(process.env.CORE_LAYER + 'security/cryptography');
const user = require('../models/user');
const parent = require('../models/parent');
const student = require('../models/student');
const shemasValidation = require('../validations/auth.validation');

module.exports.generateToken = async function (body, isParent) {
    shemasValidation.validateAuth(body);
    
    let options = {
        projection: "firstname lastname password photo role school"
    }

    let user = await getClientByEmail(body.email, isParent, options);

    if (!user) {
        throw new httpError(401, "Invalid credentials");
    }
    
    if (!await cryptography.compare(body.password, user.password)) {
        throw new httpError(401, "Invalid credentials");
    }

    return token.createToken(user);
}

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