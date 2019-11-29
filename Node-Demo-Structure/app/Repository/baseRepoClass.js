const Users = require('../model/schema/Users');
class BaseQuery {
    
    constructor(){}
    /**
     * Find all Users 
     * @author Vijay Prajapati
     */
   async findUsers() {
    let data;
    await Users.find({},{"firstName":1,"lastName":1},(err, users) => {   
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