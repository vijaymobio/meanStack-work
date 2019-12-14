// import passport and passport-jwt modules
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
const express = require("express");
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";
const router = express.Router();
const _ = require("lodash");
const requireAuth = router.all("*", function(req, res, next) {
  passport.authenticate("jwt", { session: false }, function(err, user, info) {
    // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
    if (err || !user || _.isEmpty(user)) {
      // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
      return next(info);
    } else {
      return next();
    }
  })(req, res, next);
});
// passport.authenticate("jwt", { session: false });

// User data fetch
const Users = require("../../Model/schema/Users");

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = await getUser({ id: jwt_payload.id });
  console.log("user - >", user);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

const getUser = async obj => {
  let data;
  await Users.find({ _id: obj.id }, (err, users) => {
    if (err !== null) {
      data = { err: err };
    } else {
      data = users;
    }
  });
  return data;
};

module.exports = { requireAuth, jwt, passport, strategy, jwtOptions };