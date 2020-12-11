const AWS = require('aws-sdk');
const DataStore = require('../models/datastore_models')
const Workout = require('../models/workout.model').workout

AWS.config.loadFromPath('data_store/cred.json')

AWS.config.update({region: 'us-east-1'});

var s3 = new AWS.S3({ "accessKeyId": "AKIA4B6BMLY2YRFD2POM", "secretAccessKey": "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", "region": "us-east-1" });

var bucketParams = {
    Bucket: "lls3-bucket"
}

async function allBucketKeys() {
    
  
    var keys = [];
    for (;;) {
      var data = await s3.listObjects(bucketParams).promise();
  
      data.Contents.forEach((elem) => {
        keys = keys.concat(elem.Key);
      }); 
  
      if (!data.IsTruncated) {
        break;
      }
      params.Marker = data.NextMarker;
    }
  
    return keys;
}

renderDataStore = (req, res, next) => {
    console.log("RENDERING DATA STORE .....")
    let response = allBucketKeys(s3)
        .then(response => {

            response.forEach((elem) => {
                console.log(`       Finding ${elem} in Workout Collection`)
                let workout = Workout.findOne({key: elem})
                    .then(response => {
                        console.log(`Found Item ${response}`)
                        if (response) {
                            console.log(`updatating ${elem} to true`)
                            DataStore.findOneAndUpdate({key: response.key}, {is_inDB: true}, {upsert: true})
                                .catch((err) => {return err})
                        } else {
                            console.log(`creating or updating ${elem} to false`)
                            DataStore.findOneAndUpdate({key: elem}, {is_inDB: false}, {upsert: true})
                                .catch((err) => {return err})
                        }
                    })
                    .catch((err) => {
                        console.log(`Caught ERROR ${err}`)
                        return err
                    })
                        
                
            }) 

            return res.status(200).send('complete')   
            next()
        })
        .catch((err) => console.log(err))
    res.status(200)
}


const GeneratePresignedURL = (reference) => {
    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketParams.Bucket,
        Key: reference,
        Expires: 259200
        
    })
    if (url) {
        return url
    }
    else {
        return false
    }
    
}

const amazon_tools = {renderDataStore, GeneratePresignedURL}

module.exports = amazon_tools