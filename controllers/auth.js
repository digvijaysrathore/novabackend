const User = require("../models/user");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Nova Bots Failed To Register A New User"
            })
        }
        res.json({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        })
    })
};

exports.signin = (req, res) => {
    const errors = validationResult(req)
    const {email, password} = req.body

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne(
        {email},
        (err, user) => {
            if(err || !user){
                return res.status(400).json({
                    err: "Unable to signin"
                })
            }

            if(!user.authenticate(password)){
                return res.status(401).json({
                    error: "Email and password do not match."
                })
            }

            const token = jwt.sign({_id: user._id}, process.env.SECRET)
            res.cookie("token", token, {expire: new Date() + 9999})

            const {_id, username, name, email} = user
            return res.json({token, user: {_id, username, name, email}}) 
        }
    )
};

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User signour successful"
    })
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

exports.isAuthenticated = (req, res) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next()
};