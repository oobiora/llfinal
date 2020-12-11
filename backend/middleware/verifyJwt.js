const jwt = require("jsonwebtoken");
const validator = require("validator");
const config = require("../config/auth.config");
// const user = require("../models/user.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs")

checkIfLoggedIn = (req, res, next) => {
    if (req.cookies.accessToken) {    
        let token = req.cookies.accessToken;
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log("verification error")
                next()
            }
            res.status(200).send({"permission": true})
        });
    } else {
        next();
    }
    
}

SignIn = (req, res, next) => {
    var method = req.query.method;    
    var criteria = (validator.isEmail(method) ? {email: method.toLowerCase()} : {username : method.toLowerCase()})
    const password = req.query.password;
    
    User.findOne(criteria)  
        .catch(err =>  res.status(400).send({message:"ERROR"+err}))
        .then(user => {
            if(!user){
                let err = new Error("Incorrect Username") 
                err.statusCode = 400;
                next(err)
                return;
            };

            if(user)
            {
        
                bcrypt.compare(password, user.password, function(err, ress){
                    if (err) {
                        let err = new Error("Server Error") 
                        err.statusCode = 500;
                        next(err)
                        return;
                    }
                    if (ress){
                        var id = user._id
                        var username = user.username
                        var email = user.email
                        var token = jwt.sign({id: user._id}, config.secret, {
                            expiresIn: 86400
                        })
                        
                        return res.status(200).cookie(name="accessToken", val=token, {httpOnly:true, expires: new Date(Date.now() + 86400), path:""}).send({
                            id: id,
                            username: username,
                            email: email
                        });
                    }
                    if(!ress){
                        let err = new Error("Invalid Password") 
                        err.statusCode = 400;
                        next(err)
                        return;
                    }
                })

                
                
            }
        })

    

    

};



verifyToken = (req, res, next) => {

    // console.log(`cookies, ${req.cookies}, signed cookies ${req.signedCookies}`)
    let token = req.cookies.accessToken;

    if(!token) {
        let err = new Error("Please Login") 
            err.statusCode = 400;
            next(err)
            return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            let err = new Error("Attempted Unauthorized Acces") 
            err.statusCode = 400;
            next(err)
            return;
        }
        req.userId = decoded.id;
        next();
    });
};

APISignUp = (req, res) => {
    const username = req.body.username.toLowerCase();
    var email = req.body.email
    email = email.toLowerCase()
    

    const newUser = new User({username: username, password: req.body.password, email: email});
    
    var token = jwt.sign({id: newUser._id}, config.secret, {
        expiresIn: 86400
    })

    id = newUser._id
    newUser.save()
        .then(() => res.status(200).cookie(name="accessToken", val=token, {httpOnly:true, expires: new Date(Date.now() + 86400), path:""}).send({
            id: id,
            username: username,
            email: email
        }))
        .catch(err => res.status(400).json('Error ' + err));
}

isAdmin = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            let err = new Error("No User") 
            err.statusCode = 400;
            next(err)
            return;
        }
        if (user.roles.Role === "admin" || user.roles.Role === "admin"){
            res.status(200).send({
                "permission" : true
            })
        } 
    })
}

isUser = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            let err = new Error("No User") 
            err.statusCode = 400;
            next(err)
            return;
        }
        if (user.roles.Role === "user" || user.roles.Role === "admin"){
            res.status(200).send({
                "permission" : true
            })
        }   

    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    APISignUp,
    isUser,
    SignIn,
    checkIfLoggedIn
};

module.exports = authJwt