// create workout routers
const router = require('express').Router();
let Workout = require('../models/workout.model').workout;
const DataStore = require('../models/datastore_models')
const axios = require('axios');
const amazon_tools = require('../data_store/amazon')
const VideoRender = require('../middleware/videoTools').videoRender

router.route('/admin/all').get(function(req, res) {
      DataStore.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
    });

router.route('/admin/get').get(amazon_tools.renderDataStore, (req, res) => {
  return res.status(200)
})



router.route('/admin/activate').post((req, res)=> {
  
    // if (req.body.focus == '' || req.body.focus == 'none'){
    //   delete req.body.focus;
    // }

    // if (req.body.sub_group == '' ){
    //   delete req.body.sub_group;
    // }

    // if (req.body.description == ''){
    //   delete req.body.description;
    // }

    let response = Workout.findOneAndUpdate({key: req.body.key}, req.body, {
      new: true,
      upsert : true
    })
      .then((response) => {console.log(response)})
      .catch((err)=> {console.log(err)})

    

})

router.route('/request/workout').post(VideoRender)

// router.route('/request/workout').post((req, res, next)=> {
//   console.log(req.body)

//   let data = request.body

//   axios.post('http://134.209.123.4/api/workouts/generate', data)
//     .then(response => res.status(200).send(response))
//     .catch((err) => {
//       let err = new Error("Could not generate video") 
//             err.statusCode = 400;
//             next(err)
//             return;
//     })
// })


module.exports = router
