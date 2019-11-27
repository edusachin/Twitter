const { awsBucket, awsAccessKey, awsSecretAccessKey, awsPermission } = require('./config');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey
});

const deleteFile = (file) => {
    fs.unlink(file.path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

let uploadFileToS3 = (file, module, user_id) => {
    const params = {
        Bucket: awsBucket + '/' + module + '/' + user_id,
        Key: file.originalname,
        ContentType: file.mimetype,
        Body: fs.createReadStream(file.path),
        ACL: awsPermission
    };
    s3.upload(params, function (s3Err, resp) {
        if (s3Err) {
            console.log(s3Err);
        }
        deleteFile(file);
    });
};

module.exports = uploadFileToS3;