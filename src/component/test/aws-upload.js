const fs = require('fs');
      const AWS = require('aws-sdk');
      const BUCKET_NAME = 'youhi2';
      const s3 = new AWS.S3({ accessKeyId: 'AKIA2GA2ZTVSKLAUUMX4', secretAccessKey: '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'});
      const uploadFile = (fileName) => {
        const fileContent = fs.readFileSync(fileName);
        const params = {
          Bucket: BUCKET_NAME,
          Key: 'App.js',
          Body: fileContent 
        };
        s3.upload(params, function(err, data) {
          if (err) {throw err;}
          console.log(`File uploaded successfully. ${data.Location}`);
        });
      };
      uploadFile('../App.js');