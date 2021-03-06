const mongoConnection = require('../connections/mongo.connection');

exports.findOne = async function (connectionString, model, filter, options) {
    let query = resolveQuery(options)
    await mongoConnection.connect(connectionString);
    return await model.findOne(filter, query.projection)
}

exports.findMany = async function (connectionString, model, filter, options) {
    let query = resolveQuery(options)
    await mongoConnection.connect(connectionString);
    return await model.find(filter, query.projection, { skip: query.skip, limit: query.limit }).sort([[query.sort, query.asc]])
}

exports.insertOne = async function (connectionString, document) {
    await mongoConnection.connect(connectionString);
    return await document.save()
}

exports.updateOne = async function (connectionString, model, filter, update, upsert = false) {
    await mongoConnection.connect(connectionString);
    return await model.updateOne(filter, update, {upsert: upsert})
}

exports.deleteOne = async function (connectionString, model, filter) {
    await mongoConnection.connect(connectionString);
    return await model.deleteOne(filter)
}

function resolveQuery(options){
    if(!options){
        return {};
    }

    let query = {
        ignoreLimit: options.ignoreLimit,
        projection: options.projection,
        limit: options.limit,
        page: options.page,
        sort: options.sort,
        asc: options.asc
    }

    if (query.projection == null) query.projection = {};
    if (query.limit != null) query.limit = Number(query.limit);
    if (query.page != null) query.page = Number(query.page);
    if (query.ignoreLimit != null) query.ignoreLimit = JSON.parse(query.ignoreLimit);
    if (query.asc != null) query.asc = Number(query.asc);

    query.limit = query.ignoreLimit ? null : query.limit == null || query.limit == 0 ? 1 : query.limit > 20 ? 20 : query.limit
    query.skip = query.ignoreLimit ? null : query.page == null || query.page == 0 ? null : query.limit * (query.page - 1)
    return query
}