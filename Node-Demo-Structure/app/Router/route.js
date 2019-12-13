var express = require("express");
// Old Method -  If need than uncommit
// const userData =  require('../Http/controller/usersData');
const userDataClass = require("../Http/controller/userDataClass");
const auth = require("../Http/controller/auth");
const app = express();
const userDataclass = new userDataClass();
const { requireAuth ,strategy, jwt ,passport,jwtOptions} = require('../Http/middleware/jwtToken')


// use the strategy
passport.use(strategy);
app.use(passport.initialize());

// app.post("/loginCheck", async function(req, res, next) {
//   const { name, password } = req.body;
//   if (name && password) {
//     // we get the user with the name and save the resolved promise
//     //   returned
//     let user = {
//       id: "5df1d9222a6dbd51b04e25c0dsdsd",
//       name: "vijay@gmail.com",
//       password: "123"
//     };
//     if (!user) {
//       res.status(401).json({ msg: "No such user found", user });
//     }

//     if (user.password === password) {
//       // from now on we’ll identify the user by the id and the id is
//       // the only personalized value that goes into our token
//       let payload = { id: user.id };
//       let token = jwt.sign(payload, jwtOptions.secretOrKey);
//       res.json({ msg: "ok", token: token });
//     } else {
//       res.status(401).json({ msg: "Password is incorrect" });
//     }
//   }
// });


app.get("/protected", requireAuth, function(req, res) {
  res.json("Success! You can now see this without a token.");
});

//=============================================================

// Users routes
app.get("", userDataclass.all);
app.get("/dynamic", userDataclass.dynamicAll);
app.get("/rxjs", userDataclass.findData);

// app.delete('/dynamic/user/:id', function(req,res){
//     console.log(req.params.id);

//     userDataclass.dynamicDeleteById(req,res)
// })

app.get(
  "/dynamic/:id",
  passport.authenticate("jwt", { session: false }),
  userDataclass.dynamicFindByField
);
// app.get('/dynamic/:id', userDataclass.dynamicFindByField)
app.delete("/dynamic/delete/:id", function(req, res) {
  userDataclass.dynamicDeleteById(req, res);
});
app.post("/user/create", function(req, res) {
  userDataclass.create(req, res);
});
app.post("/dynamic/user/create", function(req, res) {
  userDataclass.dynamicCreateNewUser(req, res);
});
app.post("/dynamic/delete/choice", function(req, res) {
  userDataclass.deleteMultipleRecord(req, res);
});
app.post("/dynamic/update/:id", function(req, res) {
  userDataclass.updateRecord(req, res);
});
// app.post('/dynamic/update',  function(req, res) {
//     userDataclass.updateRecord(req,res);
// });
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

// 404 API -  UnKnow API call Routed
app.all("*", userDataclass.notFoundApi);

module.exports = app;
