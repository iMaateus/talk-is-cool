exports.createResponse = function (message, code) {
    code = code || 200;
    return {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(code < 400 ? {
            success: true,
            data: message,
        } : {
            success: false,
            error: message,
        })
    }
};