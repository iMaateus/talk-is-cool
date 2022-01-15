const customResponse = require('../utils/customResponse');
const defaults = {}

module.exports = (opts = {}) => {
    const options = { ...defaults, ...opts }

    const requestAfter = async (request) => {
        return customResponse.createResponse(request.response);
    }

    const requestOnError = async (request) => {
        return customResponse.createResponse(request.error.message, !request.error.statusCode ? 500 : request.error.statusCode);
    }

    return {
        after: requestAfter,
        onError: requestOnError
    }
}