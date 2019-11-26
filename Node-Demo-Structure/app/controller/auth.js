const Users = require('../model/schema/Users');
require('dotenv').config();
module.exports = {
  all: function(req, res){
    Users.find({},{"firstName":1,"lastName":1},(err, users) => {
      if (err)
          console.log(err);
      else
        res.json(users);
    });
  },
    login: function(req, res){   
        console.log(' email   - > ',req.body);
    Users.find({"email":req.body.email,'password':req.body.password},(err, users) => {
      if (err)
          console.log(err);
      else
      if(users.length < 1){
        res.send("user name pass word in currect");  
      }else{
        res.send(users);
      }
        
    });
  }
};
