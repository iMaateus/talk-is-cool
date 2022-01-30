const middy = require(process.env.CORE_LAYER_MODULE + '@middy/core')
const parser = require(process.env.CORE_LAYER_MODULE + '@middy/http-json-body-parser')

const requestHandler = require(process.env.CORE_LAYER + 'middlewares/requestHandler');
const eventService = require('../services/event.service.js');

module.exports.search = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await eventService.search(event.identity, event.queryStringParameters);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY', 'PARENT', 'STUDENT'] }))

module.exports.get = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await eventService.get(event.identity, event.pathParameters.eventId, event.queryStringParameters);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY', 'PARENT', 'STUDENT'] }))

module.exports.post = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await eventService.insert(event.identity, event.body);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY'] }))

module.exports.put = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await eventService.update(event.identity, event.body);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY'] }))

module.exports.delete = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await eventService.delete(event.identity, event.pathParameters.eventId);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY'] }))