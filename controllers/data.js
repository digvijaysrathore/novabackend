const User = require("../models/user");

exports.creds = (req, res, next) => {
  const {email, password} = req.body
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

          next()
      }
  )
};

exports.push = (req, res) => {
    User.findOneAndUpdate(
        {email: req.body.email },
        {$push: {data: req.body.data}},
        {new: true, useFindAndModify: false},
        (err, user) => {
          if(err){
            return res.status(400).json({
              err: "Failed to push data"
            })
          }
          res.json({
            username: user.username,
            data: user.data
          })
        }
    )
};

exports.pull = (req, res) => {
  User.findOne(
    { email: req.body.email },
    (err, data) => {
      if(err){
        return res.status(400).json({
          err: "Nova is unable to pull data"
        })
      }
      res.json({
        user: data.username,
        data: data.data
      })
    }
  )
};