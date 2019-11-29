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
    Users.find({"email":req.body.email,'password':req.body.password},{"_id":1,"firstName":1,'lastName':1,'email':1},(err, users) => {
      if (err)
          console.log(err);
      else
      if(users.length < 1){
        res.status(401).send("user name pass word in currect");  
      }else{
        data = {
          'status':200,
          'UserDetails' : users,
          'message': "Login sucessfully"
         };
        res.status(200).json(data);
      }
        
    });
  }
};
