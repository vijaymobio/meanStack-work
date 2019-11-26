const Users = require('../model/schema/Users');
require('dotenv').config();
module.exports = {
  home: function(req, res){
    res.send('Home page')
  },
  all: function(req, res){    
    Users.find({},{"firstName":1,"lastName":1},(err, users) => {
      if (err)
      res.status(200).json("User Not Found");
      else
      data = {
        'status':200,
        'data' : users,
        'message': "success"
       };
      res.status(200).send(data);
    });
  },
  viewOne: function(req, res){
    Users.find({"_id":req.params.id},(err, users) => {
        if (err){          
          res.status(200).json("User Not Found");
        }
        else{
          if(users.length < 1){
            data = {
              'status':200,
              'message': "User not Found"
             };
            res.status(200).send(data);
          }else{
          data = {
          'status':200,
          'data' : users,
          'message': "success"
         };
        res.status(200).send(data);
        }
      }
    });
  },
  create: function(req, res){

    Users.insertOne({'firstName':'Manoj','lastName':'Prajapati','email':'manoj@gmail.com','password':'manojp86'})
    // data = {
    //   'status':200,
    //   'data' : res,
    //   'message': "add succsessfully"
    //  };
    res.status(200).send("add successfully");
  },
  destroy: function(req, res){
    res.send('Todo ' + req.params.id + ' delete')
  },
  edit: function(req, res){
    res.send('Todo ' + req.params.id + ' updated')
    // res.send(process.env.SECRET_KEY);
  }
};
