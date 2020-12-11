const { package } = require('../models/workout.model')
const {GeneratePresignedURL} = require('../data_store/amazon')
const Workout = require('../models/workout.model').workout



VideoRender = async (req, res, next) => {
    let package = []
    let length = req.body.length
    
    switch (length) {
        case 1:
            length = 4
            break
        case 2:
            length = 6
            break
        case 3:
            length = 8
            break
        case 4:
            length = 12
            break
    }
    
    let firstVid = await getVideo("block", 0)
        .catch((err) => {
            err = new Error("Error retrieving Video")
            err.statusCode = 400
            next(err)
            return
        })
        .then(response => {return response})
    if (firstVid) {
        // console.log(firstVid)
        package.push(firstVid)
        
    }
    
    let i = 1
    console.log(length)
    while(i < 5){
        let video = await getBlockVideo(i, length)
        .catch((err) => {
            err = new Error("Error retrieving Video")
            err.statusCode = 400
            next(err)
            return
        })
        .then(response => {return response})
        if (video) {
            // console.log(`block videos ${video}`)
            video.forEach(vid => {
                package.push(vid)}
                )
            
        }

        

        i+=1
        
    }
    let sendWrk = []
    package.forEach(vid => {
        let url = GeneratePresignedURL(vid.key)
            
        if (url) {
            sendWrk.push({
                name: vid.key,
                description: vid.description,
                sources: [{
                    src: url,
                    type: 'video/mp4'
                }]
            })
        }
        else {
            console.log("error with", vid.key)
        }
        
    })
    
    console.log(sendWrk)
    
    res.status(200).send(sendWrk)
}



// Get video belonging to block x
getBlockVideo = async (block, length) => { 
    let videos = await Workout.find({'block': block}).limit(length)
        .catch((err) => {
            return err
        })
        .then((video) => {
            return video
        })
    // console.log(videos)
    return videos
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }



getVideo = async (param, val) => {
    let query = {}
    query[param] = val
    let video = await Workout.findOne(query, (err, video) => {
        if (err){
            // console.log(`error passed`)
            return err
        }
        if (video) {
            // console.log(`found video ${video}`)
            return video
        }
        if (!video) {
            // console.log(`no video found`)
            return false
        }
    })
    return video
}


module.exports.videoRender = VideoRender
