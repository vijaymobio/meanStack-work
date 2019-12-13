const Users = require('../model/schema/Users');
const validation = require("../helpers/validation")
const validate = new validation;
const Cryptr = require("../helpers/CryptrPassword")
const cryptr = new Cryptr;
class BaseQuery {
    
    constructor(){}

    /** 
     *  Find all User  
     * @param {*} req 
     * @param {*} res 
     */
    async dynamicFind(tableName,field) {
        let data;
        await tableName.find({},field,(err, users) => {   
            if(err !== null){
                data = {'err' : err};
            } else {
                data = users;
            }
         });
        return  data;                        
    }

    /**
     * 
     * Find user by id and other filed with dynamic tablename and field name
     * @param {*} req 
     * @param {*} res 
     * @author Vijay Prajapati
     * 
     */
    async dynamicFindByField(tableName,field,key){
        let data;
        await  tableName.find(key,field,(err, users) => {
            if(err !== null){
                data = {'err' : err};
            } else {
                data = users;
            }
            });
        return  data;     
    }

    /**
     * Delete record from table using ID
     * @param {*} tablename 
     * @param {*} keyValue 
     */
    async dynamicDeleteById(tablename,keyValue){
        let data;
        await tablename.deleteOne(keyValue,function(err,user){
            if(err !== null){
                data = {'err' : err};
            } else {
                data = user;
            }
        });
        return data;
    }

     /**
     * Delete multiple record from table using ID
     * @param {*} tablename 
     * @param {*} keyValue 
     */
    async multipleDelete(tablename,values){
        let data;
        await tablename.deleteMany({ '_id' : { $in: values}},function(err,user){
            if(err !== null){
                data = {'err' : err};
            } else {
                data = user;
            }
        });
        return data;
    }

    /**
     * Update User data
     * @author Vijay Prajapati
     */
    async updateUserDetails(tableName,values,id){
        const validEmail = validate.validateEmail(values.email);
        if(validEmail){
            const getUser = await this.dynamicFindByField(tableName,{'_id':1,'firstName':1,'lastName':1,'email':1},{"email":values.email});
            if(getUser.length > 0 ){
                return {'status':409,'message ':'Email id existed'}
            }     
            let data;
            await tableName.update(
                { _id: id },
                    {
                    firstName: values.firstName,
                    lastName:  values.lastName,
                    email: values.email
                    }
                ,function(err,user){
                    if(err !== null){
                        data = {'err' : err};
                    } else {
                        data = user;
                    }
                }
                )
            return data;
        } else{
            return {'status':400,'message ':'Please Enter valid email ID'}
        }
    }


    /**
     * Create New user 
     * @param tableName
     * @param req
     * @author Vijay Prajapati
     * 
     */

    
    async dynamicCreateNewUser(tableName,req) {
        const validEmail = validate.validateEmail(req.body.email);
        const validPasss = validate.validatePassword(req.body.password);
        const encrypt = cryptr.encrypt(req.body.password);
        console.log('encrypt - > ',encrypt);
        const decrept = cryptr.decrypt(encrypt);
        console.log('decrept - > ',decrept);
        req.body.password = encrypt;
        if(validEmail){
            const getUser = await this.dynamicFindByField(tableName,{'firstName':1,'lastName':1,'email':1},{"email":req.body.email})   
            if(getUser.length > 0){
                return {'status':409,'message ':'Email id existed'}
            }
            if(validPasss){
                let data = await tableName.create({"firstName":req.body.firstName,"lastName":req.body.lastName,"email":req.body.email,"password":req.body.password});
                return  data;                            
            }else{
                return {'status':422,'message ':'Please Enter Strong password'}
            } 
            
        }else{
            return {'status':400,'message ':'Please Enter valid email ID'}
        }
        
    }   
    async login(tablename,auth){
        const validEmail = validate.validateEmail(auth.email);
        const validPasss = validate.validatePassword(auth.password);    

        if(validEmail && validPasss){
           const data  = await tablename.find({'email':auth.email},{"_id":1,"firstName":1,'lastName':1,'email':1,'password':1});    
           if(data.length > 0){
                const decPass = cryptr.decrypt(data[0].password);
                // console.log('decPass',decPass);
                if(decPass === auth.password){
                    const response ={
                        'status':200,
                        'Message':data[0].firstName +' '+ data[0].lastName +' Successfully login'
                    }
                    return response;     
                }else{
                    const err = {
                        "status":401,
                        "message":"EmailID and Password is incurrect"
                    }
                    return err;
                }
             }else{
                const err = {
                    "status":401,
                    "message":"EmailID and Password is incurrect"
                }
                return err;
            }
        }else{
            const err = {
                "status":401,
                "message":"EmailID and Password is incurrect"
            }   
            return err;
        }
    }

    /**
     * Find all Users 
     * @author Vijay Prajapati
     */
   async findUsers() {
    let data;
    await Users.find({},{"firstName":1,"lastName":1},(err, users) => {   
        if(err){
            return err;
        }
        data = users;              
        });
     return  data;                        
    }

    /**
     * Find Users using by ID
     * @author Vijay Prajapati
     */
    async findUsersId(id) {
        let data;
        await  Users.find({"_id":id},(err, users) => {
            if(err !== null){
                data = {'err' : err};
            } else {
                data = users;
            }
            });
        return  data;                        
    }

    /**
     * Create New user 
     * @author Vijay Prajapati
     */
    async createNewUser(req) {
        let data = await Users.create({"firstName":req.body.firstName,"lastName":req.body.lastName,"email":req.body.email,"password":req.body.password});
        return  data;                        
    }   
}
module.exports = BaseQuery;