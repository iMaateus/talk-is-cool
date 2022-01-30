const middy = require(process.env.CORE_LAYER_MODULE + '@middy/core')
const parser = require(process.env.CORE_LAYER_MODULE + '@middy/http-json-body-parser')

const requestHandler = require(process.env.CORE_LAYER + 'middlewares/requestHandler');
const talkService = require('../services/talk.service.js');

module.exports.search = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await talkService.search(event.identity, event.queryStringParameters);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY', 'PARENT', 'STUDENT'] }))

module.exports.me = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await talkService.search(event.identity, event.queryStringParameters, true);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY'] }))

module.exports.post = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await talkService.insert(event.identity, event.body);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY'] }))

module.exports.delete = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await talkService.delete(event.identity, event.pathParameters.eventId);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY'] }))