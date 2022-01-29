const middy = require(process.env.CORE_LAYER_MODULE + '@middy/core')
const parser = require(process.env.CORE_LAYER_MODULE + '@middy/http-json-body-parser')

const requestHandler = require(process.env.CORE_LAYER + 'middlewares/requestHandler');
const tagService = require('../services/tag.service.js');

module.exports.search = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await tagService.search(event.identity, event.queryStringParameters);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY', 'PARENT', 'STUDENT'] }))

module.exports.get = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await tagService.get(event.identity, event.pathParameters.tagId, event.queryStringParameters);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY', 'PARENT', 'STUDENT'] }))

module.exports.post = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await tagService.insert(event.identity, event.body);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'COORDINATOR'] }))

module.exports.put = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await tagService.update(event.identity, event.body);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'COORDINATOR'] }))

module.exports.delete = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await tagService.delete(event.identity, event.pathParameters.tagId);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'COORDINATOR'] }))