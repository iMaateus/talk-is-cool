const middy = require(process.env.CORE_LAYER_MODULE + '@middy/core')
const parser = require(process.env.CORE_LAYER_MODULE + '@middy/http-json-body-parser')

const requestHandler = require(process.env.CORE_LAYER + 'middlewares/requestHandler');
const utils = require(process.env.CORE_LAYER + 'utils/utils');
const userService = require('../services/user.service.js');

module.exports.auth = middy(async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return await userService.generateToken(event.body, utils.fieldToBool(event.queryStringParameters, 'isParent'));
}).use(parser())
    .use(requestHandler())