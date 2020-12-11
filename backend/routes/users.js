const router = require('express').Router();
let User = require('../models/user.model');
let tools = require('../middleware/index')


//routes user information by user id -- in progress
router.route('/api/login').get(tools.authJwt.checkIfLoggedIn, tools.authJwt.SignIn);

router.route('/api/logout').get((req, res) => {
    res.clearCookie('accessToken').status(200)
})

router.route('/api/update').get((req, res) => {

});



router.route('/api/authenticate/user').get(tools.authJwt.verifyToken, tools.authJwt.isUser)

router.route('/api/authenticate/admin').get(tools.authJwt.verifyToken, tools.authJwt.isAdmin)

// creates new user with username id -- inprogress
router.route('/api/signup').post(tools.verifySignUp.verifyUE, tools.authJwt.APISignUp)

// router to add a workout under a user

module.exports = router;