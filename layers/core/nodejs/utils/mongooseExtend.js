const mongoose = require('mongoose');

module.exports.extendSchema = function (Schema, definition, options) {
    return new mongoose.Schema(
        Object.assign({}, Schema.obj, definition),
        options
    );
}

module.exports.loadModel = function (modelName, modelSchema) {
    return mongoose.models[modelName]
        ? mongoose.model(modelName)
        : mongoose.model(modelName, modelSchema, modelName)
}