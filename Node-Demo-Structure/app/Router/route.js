var express = require("express");
const request = require('supertest');
// Old Method -  If need than uncommit
// const userData =  require('../Http/controller/usersData');
const userDataClass = require("../Http/controller/userDataClass");
const auth = require("../Http/controller/auth");
const app = express();
const userDataclass = new userDataClass();
  
const {
  requireAuth,
  strategy,
  passport,
} = require("../Http/middleware/jwtToken");
const _ = require("lodash");

// use the strategy
passport.use(strategy);
app.use(passport.initialize());

app.get("/protected", requireAuth, function(req, res) {
  res.json("Success! You can now see this without a token.");
});


// Users routes
app.get("", userDataclass.all);
app.get("/dynamic",requireAuth, userDataclass.dynamicAll);
app.get(
  "/dynamic/:id",
  requireAuth,
  userDataclass.dynamicFindByField
);
// app.get('/dynamic/:id', userDataclass.dynamicFindByField)
app.delete("/dynamic/delete/:id", requireAuth,function(req, res) {
  userDataclass.dynamicDeleteById(req, res);
});
app.post("/user/create",requireAuth, function(req, res) {
  userDataclass.create(req, res);
});
app.post("/dynamic/user/create", requireAuth,function(req, res) {
  userDataclass.dynamicCreateNewUser(req, res);
});
app.post("/dynamic/delete/choice", requireAuth,function(req, res) {
  userDataclass.deleteMultipleRecord(req, res);
});
app.post("/dynamic/update/:id",requireAuth, function(req, res) {
  userDataclass.updateRecord(req, res);
});
app.get("/user/delete/:id", userDataclass.destroy);
app.get("/user/edit/:id", userDataclass.edit);
app.get("/user/:id", userDataclass.viewOne);

// Authentication Route
app.post("/dynamiclogin", function(req, res) {
  userDataclass.login(req, res);
});
app.post("/login", function(req, res) {
  auth.login(req, res);
});

/**
 * APi Authenticate by -requireAuth-  
 */
app.use((err, req, res, next) => {
  let responseStatusCode = 500;
  let responseObj = {
    success: false,
    data: [],
    error: err,
    message: "There was some internal server error"
  };

  // IF THERE WAS SOME ERROR THROWN BY PREVIOUS REQUEST
  if (!_.isNil(err)) {
    // IF THE ERROR IS REALTED TO JWT AUTHENTICATE, SET STATUS CODE TO 401 AND SET A CUSTOM MESSAGE FOR UNAUTHORIZED
    if (err.name === "JsonWebTokenError") {
      responseStatusCode = 401;
      responseObj.message =
        "You cannot get the details. You are not authorized to access this protected resource";
    }
  }

  if (!res.headersSent) {
    res.status(responseStatusCode).json(responseObj);
  }
});

// 404 API -  UnKnow API call Routed
app.all("*", userDataclass.notFoundApi);


module.exports = app;
