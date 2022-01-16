const validator = require(process.env.CORE_LAYER_MODULE + 'fluent-validator');
const httpError = require(process.env.CORE_LAYER_MODULE + 'http-errors');

exports.validateAuth = function (body) {
    var validation = validator()
        .validate(body.email).isEmail()
        .validate(body.password).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)

    if (validation.hasErrors()) {
        throw new httpError(400, "Invalid payload");
    }
}