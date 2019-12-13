// import passport and passport-jwt modules
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";
const requireAuth = passport.authenticate("jwt", { session: false });

// User data fetch 
const Users = require("../../Model/schema/Users");

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = await getUser({ id: jwt_payload.id });
  console.log('user - >',user);
  
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
          console.log('----->>>',data);
          
        }
      });
      return data;
};

module.exports = { requireAuth, jwt, passport, strategy, jwtOptions };

// Help For import Jwt token //

// ------------------Import module in your need to token save-----------------
// -> const { requireAuth ,strategy, jwt ,passport,jwtOptions} = require('../Http/middleware/jwtToken')

// ------------use the strategy---------------

// -> passport.use(strategy);
// -> app.use(passport.initialize());

// ----------------add this in rout---------------------

// -> let payload = { id: 'user.id' };
// -> let token = jwt.sign(payload, jwtOptions.secretOrKey);
// -> console.log('new token',token);
