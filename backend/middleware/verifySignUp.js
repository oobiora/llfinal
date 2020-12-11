const User = require("../models/user.model")
const validator = require('validator')



verifyUE = (req, res, next) => {
    username = req.body.username
    if (!validator.isEmail(req.body.email)) {
        let err = new Error("Email is not valid") 
            err.statusCode = 400;
            next(err)
            return;
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            let err = new Error("Server Cannot be Reached") 
            err.statusCode = 500;
            next(err)
            return;
        }
        if (user){
            let err = new Error("Email is already in use") 
            err.statusCode = 400;
            next(err)
            return;
        }
    

        User.findOne({username: username}, (err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            if (user){
                let err = new Error("Username is already in use") 
                err.statusCode = 400;
                next(err)
                return;
            }

            next();
        })
    })
}

const verifySignUp = { verifyUE }
module.exports = verifySignUp;

