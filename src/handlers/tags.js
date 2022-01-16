const middy = require(process.env.CORE_LAYER_MODULE + '@middy/core')
const parser = require(process.env.CORE_LAYER_MODULE + '@middy/http-json-body-parser')

const requestHandler = require(process.env.CORE_LAYER + 'middlewares/requestHandler');
const tagService = require('../services/tag.service.js');

module.exports.search = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(event)
    return await tagService.search(event.identity, event.queryStringParameters);
}).use(parser())
    .use(requestHandler({ private: true, permissions: ['ADMIN', 'TEACHER', 'COORDINATOR', 'SECRETARY', 'PARENT', 'STUDENT'] }))