const validator = require(process.env.CORE_LAYER_MODULE + 'fluent-validator');
const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');

validator.add('have', 'Expected ${0} value', function(value, required) {
    return validator.isNotNullOrUndefined(required) && validator.isNotEmpty(required);
});

exports.validateUpsert = function (body) {
    

    var validation = validator()
        .validate(body.message).isNotNullOrUndefined().isNotEmpty().or.have(body.midia)
        .validate(body.type).isNotNullOrUndefined().isNotEmpty().have(body.midia).or.have(body.message)

    if (body.tags) {
        body.tags.forEach(function (tag) {
            validation.validate(tag._id).isMongoObjectId()
                .validate(tag.name).isNotNullOrUndefined().isNotEmpty()
        })
    }

    if (body.attachments) {
        body.attachments.forEach(function (attachment) {
            validation.validate(attachment.key).isNotNullOrUndefined().isNotEmpty()
                .validate(attachment.name).isNotNullOrUndefined().isNotEmpty()
        })
    }

    if (body.type) {
        validation.validate(body.type).isIn(['picture', 'gif', 'link']).have(body.midia)
    }

    if (body.midia) {
        validation.validate(body.midia).isNotNullOrUndefined().isNotEmpty().have(body.type)
    }

    body.published = !(body.scheduledAt && Date.parse(body.scheduledAt))
    body.scheduledAt = body.scheduledAt ? new Date(Date.parse(body.scheduledAt)) : new Date()

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }

    validation.validate
}