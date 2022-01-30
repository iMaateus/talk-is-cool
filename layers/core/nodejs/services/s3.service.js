const AWS = require('aws-sdk')

exports.getSignedUrl = async function (bucket, key, expires) {
    const s3 = new AWS.S3()

    return await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: key,
            Expires: expires
        }, (err, url) => {
            err ? reject(err) : resolve(url);
        })
    })
}