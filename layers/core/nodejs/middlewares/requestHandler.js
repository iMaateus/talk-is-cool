const httpError = require('http-errors');
const customResponse = require('../utils/customResponse');
const token = require('../security/token');
const defaults = {}

module.exports = (opts) => {
    const options = { ...defaults, ...opts }

    const requestBefore = async (request) => {
        if (options.private) {
            if (!request.event.headers.Authorization) {
                throw new httpError(401, "Unauthorized");
            }

            const identity = token.validateToken(request.event.headers.Authorization);

            if (options.permissions) {
                if (!options.permissions.includes(identity.role)) {
                    throw new httpError(403, "Forbidden Access");
                }
            }

            request.event['identity'] = identity
            console.log(request)
        }
    }

    const requestAfter = async (request) => {
        return customResponse.createResponse(request.response);
    }

    const requestOnError = async (request) => {
        return customResponse.createResponse(request.error.message, !request.error.statusCode ? 500 : request.error.statusCode);
    }

    return {
        before: requestBefore,
        after: requestAfter,
        onError: requestOnError
    }
}