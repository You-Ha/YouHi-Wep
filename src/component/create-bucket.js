const AWS = require('aws-sdk');

const ID = 'AKIA2GA2ZTVSKLAUUMX4';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'youhi2';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
      // Set your region here
      LocationConstraint: "ap-northeast-2"
  }
};

s3.createBucket(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log('Bucket Created Successfully', data.Location);
});