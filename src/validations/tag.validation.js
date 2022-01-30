const validator = require(process.env.CORE_LAYER_MODULE + 'fluent-validator');
const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');

exports.validateUpsert = function (body, update = false) {
    var validation = validator()
        .validate(body.name).isNotNullOrUndefined().isNotEmpty()
        .validate(body.description).isNotNullOrUndefined().isNotEmpty()

    if (update) {
        validation.validate(body._id).isMongoObjectId()
    }

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }
}