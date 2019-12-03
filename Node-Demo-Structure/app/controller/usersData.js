const Users = require('../model/schema/Users');
// var query =  require('../Repository/BaseRepo')
const baseQuery = require('../Repository/baseRepoClass');
const getQuery = new baseQuery;

require('dotenv').config();
module.exports = {
   
 /**
  * Find all Users 
  * @author Vijay Prajapati
  */

  async all(req, res){    
    // const data = await getQuery.findUsers();
     const data = await getQuery.findUsers();
    data2 = {
      'status':200,
      'data' : data,
      'message': "success"
    };
    res.status(200).send(data2);
  },

 
 /**
  * Find Users using by ID
  * @author Vijay Prajapati
  */

  async viewOne(req, res){
    const data = await getQuery.findUsersId(req.params.id); 
    if(data.err){
      res.status(200).send("Somthing wrong");
    }
    if(data.length > 0)  
    {
      userDetails = {
      'status':200,
      'data' : data,
      'message': "User find"
      };
      res.status(200).send(userDetails);
    } else {
      res.status(200).send("Record not Fond");
    }
  },

 /**
  * Create new user
  * @author Vijay Prajapati
  */

  async create(req, res){
    const data = await getQuery.createNewUser(req); 
    let response =  {
      "status":200,
      "data":data,
      "message" : "User Add sucessfully"
    }
    res.status(200).send(response);
  },
  destroy: function(req, res){
    Users.deleteOne({"_id":req.params.id});
    res.send('Todo ' + req.params.id + ' delete')
  },
  edit: function(req, res){
    res.send('Todo ' + req.params.id + ' updated')
    // res.send(process.env.SECRET_KEY);
  },
  notFoundApi: function(req, res){
    data = {
      'status':404,
      'error': "404 Rest API Not Found"
     };
    res.status(404).send(data);
    // res.send(process.env.SECRET_KEY);
  }
};
