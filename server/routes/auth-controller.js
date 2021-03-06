const express         = require("express");
const authController  = express.Router();
const passport        = require("passport");

// Our user model
const User            = require("../api/user/user.model");
const upload          = require('../config/multer');

const isAuthenticated = require('../config/isAuthenticated'); //prueba

// Bcrypt let us encrypt passwords
const bcrypt         = require('bcrypt');
const bcryptSalt     = 10;

console.log("authController");

authController.post("/signup", (req, res, next) => {

  var username = req.body.username;
  var password = req.body.password;
  var email    = req.body.email;
  var address  = req.body.address;
  var longitude= req.body.longitude;
  var latitude = req.body.latitude;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass,
      email,
      address,
      longitude,
      latitude
    });

    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
          res.status(200).json(req.user);
        });
      }
    });
  });
});

authController.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(500).json({ message: 'Something went wrong in passport.authenticate' });
      return;
     }

    if (!user) { return res.status(401).json(info); }

    req.login(user, function(err) {
      if (err) {
        console.log ("dentro del reglogin");
        return res.status(500).json({
          message: 'something went wrong :('
        });
      } else{
        res.status(200).json(req.user);}

    });
  })(req, res, next);
});

authController.post("/logout",function(req, res, next) {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

authController.get("/loggedin", function(req, res, next) {
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({ message: 'Unauthorized, no logueado' });
});


/* ---- TEST ---- */
authController.get('/test', (req, res) => {
  console.log("REQ:SESSIONSTORE: ",req.sessionStore);
  console.log("REQ.SESSIONID: ",req.sessionID);
  console.log("REQ.SESSION: ",req.session);
  console.log("REQ USER; ",req.user);
  res.status(200).end(req.isAuthenticated() ? 'logged in': 'logged out');
});
/* ---- TEST ----*/


authController.get("/private", (req, res) => {

  if(req.isAuthenticated()) {
    //return res.json({ message: 'This is a private message' });
    return res.json(req.user);
  }
 else {
   console.log("req.no esta autenticado");
   return res.status(403).json({ message: 'Unauthorized' });
 }

});




module.exports = authController;
