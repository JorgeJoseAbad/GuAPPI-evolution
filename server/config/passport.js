const LocalStrategy  = require('passport-local').Strategy;
const User          = require("../api/user/user.model");
const bcrypt       = require("bcrypt");

module.exports = function (passport) {

  console.log("llegamos a pasportjs");

  passport.serializeUser((user, cb) => {
    console.log("SERIALIZE USER");
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    console.log("DESESERIALIZE USER");
    User.findOne({ "_id": id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {

        return next(err);
      }

      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  }));


};
