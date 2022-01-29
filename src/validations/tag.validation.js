const validator = require(process.env.CORE_LAYER_MODULE + 'fluent-validator');
const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');

exports.validateInsert = function (body) {
    var validation = validator()
        .validate(body.name).isNotNullOrUndefined().isNotEmpty()
        .validate(body.description).isNotNullOrUndefined().isNotEmpty()

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }
}

exports.validateUpdate = function (body) {
    var validation = validator()
        .validate(body._id).isMongoObjectId()
        .validate(body.name).isNotNullOrUndefined().isNotEmpty()
        .validate(body.description).isNotNullOrUndefined().isNotEmpty()

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }
}