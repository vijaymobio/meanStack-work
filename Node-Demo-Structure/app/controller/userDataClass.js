const Users = require('../model/schema/Users');
var query =  require('../Repository/BaseRepo')
const baseQuery = require('../Repository/baseRepoClass');
const getQuery = new baseQuery;
const mongoose =  require('mongoose')
class userDataclass {

    constructor(){}

    /**
     * 
     * Find user by dynamic tablename and field name
     * @param {*} req 
     * @param {*} res 
     * @author Vijay Prajapati
     * 
     */
    async dynamicAll(req, res){   
      const data = await getQuery.dynamicFind(Users,{'firstName':1,'lastName':1,'email':1});
      if(data.err){
        return res.status(200).send("Somthing wrong");
      }
      if(data.length > 0)  
      {
       const  userDetails = {
        'status':200,
        'data' : data,
        'length':data.length,
        'message': "all User finds"
        };
        res.status(200).send(userDetails);
      } else {
        res.status(200).send('User Not Found');
      }
    }


    /**
     * 
     * Find user by id and other filed with dynamic tablename and field name
     * @param {*} req 
     * @param {*} res 
     * @author Vijay Prajapati
     * 
     */
    async dynamicFindByField(req, res){ 
      const data = await getQuery.dynamicFindByField(Users,{'firstName':1,'lastName':1,'email':1},{"_id":req.params.id}); 
      if(data.err){
        res.status(200).send("Somthing wrong");
      }
      if(data.length > 0)  
      {
       const  userDetails = {
        'status':200,
        'data' : data,
        'length':data.length,
        'message': "User find"
        };
        res.status(200).send(userDetails);
      } else {
        res.status(200).send('User Not Found');
      }
    }


    async dynamicDeleteById(req, res){
      let data;
      if (!mongoose.Types.ObjectId.isValid(req.params.id)){
          return res.status(200).send('Invalid ID.');
        }
      data = await getQuery.dynamicDeleteById(Users,{"_id":req.params.id });
      if(data.deletedCount ===1 ){
        res.status(200).send('Delete successfuly');
      } else if(data.err){
        res.status(200).send('error');
      } else{ 
        res.status(200).send('User Not Found');
      }
    }

    async deleteMultipleRecord(req , res){
      const values = [
        '5de65b01ae9ed234e07e052f',
        '5de65b56ce23fb352eeec979'
      ]
      //  Postman json 
      //  {
      //    "id":[
      //      "5de65b01ae9ed234e07e052d",
      //      "5de65b01ae9ed234e07e052c",
      //      "5de65b00ae9ed234e07e052b",
      //      "5de65b00ae9ed234e07e052a"]
      //  }
       
      const data = await getQuery.multipleDelete(Users,req.body.id);
      console.log('data- > ', data);
      if(data.deletedCount > 0 ){
        const  userDetails = {
          'status':200,
          'numberOfDelete': data.deletedCount,
          'message': "Sucessfully record deleted"
          };
          res.status(200).send(userDetails);
      } else if(data.err){
        res.status(200).send('error');
      } else{ 
        res.status(200).send('User Not Found');
      }
    }

    async  updateRecord(req , res){
      const values = { 
        firstName : 'pratik',
        lastName : 'Prajapati',
        email :'vijay@gmail.com'
      } 

      const data = await getQuery.updateUserDetails(Users,values,req.params.id);

      if(data.nModified > 0 ){
          const  userDetails = {
            'status':200,
            'message': "Sucessfully record Updated"
          };
          res.status(200).send(userDetails);
          return;
      } 
      
      if(data.err){
        res.status(200).send('error');
        return;
      }
      return res.status(200).send('no update any');
    }
  
    

 /**
  * Find all Users 
  * @author Vijay Prajapati
  */  
 async all(req, res){   
    // const data = await getQuery.findUsers();
    const data = await getQuery.findUsers();
    const data2 = {
      'status':200,
      'users' : data,
      'length':data.length,
      'message': "success",
    };
    res.status(200).send(data2);
  }

 
 /**
  * 
  * Find Users using by ID
  * @author Vijay Prajapati
  * 
  */

  async viewOne(req, res){
    const data = await getQuery.findUsersId(req.params.id); 
    if(data.err){
      res.status(200).send("Somthing wrong");
    }
    if(data.length > 0)  
    {
     const  userDetails = {
      'status':200,
      'data' : data,
      'length':data.length,
      'message': "User find"
      };
      res.status(200).send(userDetails);
    } else {
      res.status(200).send("Record not Fond");
    }
  }

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
  }

   /**
  * Edit user details using ID
  * @author Vijay Prajapati
  */
  edit(req, res){
    res.send('Todo ' + req.params.id + ' updated')

  }
  /**
  * Unkonw API 
  * @author Vijay Prajapati
  */
  notFoundApi(req, res){
    const data = {
      'status':404,
      'error': "404 Rest API Not Found"
     };
    res.status(404).send(data);
  }

  /**
   * Delete record using ID
   * @param {*} req 
   * @param {*} res 
   * @author Vijay Prajapati
   */
  destroy(req, res){
    Users.deleteOne({"_id":req.params.id});
    res.send('Todo ' + req.params.id + ' delete')
  }
}

module.exports = userDataclass;