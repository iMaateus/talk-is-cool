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

exports.deleteFiles = async function (bucket, keys) {
    const s3 = new AWS.S3()
    const objects = keys.map(key => ({ Key: key }));

    await s3.deleteObjects({
            Bucket: bucket,
            Delete: { Objects: objects },
        }).promise();
}