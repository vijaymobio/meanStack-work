const Users = require('../model/schema/Users');
class BaseQuery {
    
    constructor(){}
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
            console.log(tableName,values,id);
            
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
             console.log('base-repo - > ', data);
             return data;
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