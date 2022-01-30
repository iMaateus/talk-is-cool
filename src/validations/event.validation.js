const validator = require(process.env.CORE_LAYER_MODULE + 'fluent-validator');
const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');

exports.validateUpsert = function (body, update = false) {
    var validation = validator()
        .validate(body.name).isNotNullOrUndefined().isNotEmpty()
        .validate(body.description).isNotNullOrUndefined().isNotEmpty()
        .validate(body.date).isDate()
        .validate(body.endDate).isDate().isAfterOrEql(body.date)
        .validate(body.type).isIn(['cultural', 'sporty', 'meeting', 'academic'])

    if (body.tags) {
        body.tags.forEach(function (tag) {
            validation.validate(tag._id).isMongoObjectId()
                .validate(tag.name).isNotNullOrUndefined().isNotEmpty()
        })
    }

    if (update) {
        validation.validate(body._id).isMongoObjectId()
    }

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }

    validation.validate
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