const httpError = require('http-errors');
const jwt = require('jsonwebtoken');
const jwtdecode = require('jwt-decode');

exports.createToken = function (user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            photo: user.photo,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            schoolId: user.school._id,
            isAdmin: user.role == 'ADMIN',
            isClient: user.role == 'PARENT' || user.role == 'STUDENT'
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '7d'
        })
}

exports.validateToken = function (token) {
    return jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) throw new httpError(401, "Unauthorized");
        return decoded;
    });
}

exports.generatePolicy = function (principalId, methodArn) {
    const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: apiGatewayWildcard,
                },
            ],
        },
    };
};

exports.identity = function (token) {
    return jwtdecode(token);
}