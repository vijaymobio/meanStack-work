const Users = require("../../Model/schema/Users");
// var query =  require('../Repository/BaseRepo')
const connection = require("../../Config/db"); // Requere for connection DB
const baseQuery = require("../../Repository/baseRepoClass");
const getQuery = new baseQuery();
const mongoose = require("mongoose");

class UserDataclass {
  constructor() {}

  /**
   *
   * Find user by dynamic tablename and field name
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   *
   */

  findData(req, res) {
    getQuery
      .dynamicFind(Users, { firstName: 1, lastName: 1, email: 1 })
      .then(response => {
        // const  data = {
        //   'status':200,
        //   'Message':'User Find',
        //   'data':response
        // }
        // return res.send(data);
      })
      .catch(err => {
        const error = {
          status: 500,
          message: "Internal server Error-" + err.message
        };
        return res.send(error);
      });
  }

  /**
   *  Find all User
   * @param {*} req
   * @param {*} res
   */
  dynamicAll(req, res) {
      getQuery
        .dynamicFind(Users, {
          firstName: 1,
          lastName: 1,
          email: 1,
          password: 1
        })
        .then(data => {
          if (data.length > 0) {
            const userDetails = {
              status: 200,
              message: "all User finds",
              data: data,
              length:data.length
            };
            res.status(200).send(userDetails);
          } else {
            const userDetails = {
              status: 200,
              message: "Users are Empty"
            };
            res.status(200).send(userDetails);
          }
        })
        .catch(err => {
          const error = {
            status: 500,
            message: "Internal Server Error"
          };
          res.status(500).send(error);
        });
  }

  /**
   *
   * Find user by id and other filed with dynamic tablename and field name
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   *
   */

  dynamicFindByField(req, res) {
    getQuery
      .dynamicFindByField(
        Users,
        { firstName: 1, lastName: 1, email: 1 },
        { _id: req.params.id }
      )
      .then(data => {
        if (data.err) {
          return res
            .status(200)
            .send({ status: 200, message: "Somthing wrong" });
        }
        if (data.length > 0) {
          const userDetails = {
            status: 200,
            length: data.length,
            message: "Find user success",
            data: data
          };
          return res.status(200).send(userDetails);
        } else {
          const userDetails = {
            status: 200,
            message: "User Not found"
          };
          return res.status(200).send(userDetails);
        }
        // res.status(500).send(err);
      })
      .catch(err => {
        const error = {
          status: 500,
          message: "Internal Server Error - " + err.message
        };
        return res.status(500).send(error);
      });
  }

  /**
   * Delete user using ID
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  dynamicDeleteById(req, res) {
    let data;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const data = {
        status: 200,
        Message: "Invalid Id"
      };
      return res.status(200).send(data);
    }
    getQuery
      .dynamicDeleteById(Users, { _id: req.params.id })
      .then(data => {

        
        console.log('data-> ',data);
                
        if (data.deletedCount === 1) {
          const data = {
            status: 200,
            Message: "Delete successfuly"
          };
          res.status(200).send(data);
        } else if (data.err) {
          const data = {
            status: 200,
            Message: data.err.message
          };
          res.status(200).send(data);
        } else {
          const data = {
            status: 200,
            Message: "User Not Found"
          };
          res.status(200).send(data);
        }
        // res.status(500).send(err);
      })
      .catch(err => {
        const errDetails = {
          status: 500,
          message: "Internal Server Error - " + err.message
        };
        res.status(500).send(errDetails);
      });
  }
  /**
   * Multiple record deleted
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  deleteMultipleRecord(req, res) {
    //  Postman json  , Send data from frondend like below
    //  {
    //    "id":[
    //      "5de65b01ae9ed234e07e052d",
    //      "5de65b01ae9ed234e07e052c",
    //      "5de65b00ae9ed234e07e052b",
    //      "5de65b00ae9ed234e07e052a"]
    //  }

    getQuery
      .multipleDelete(Users, req.body.id)
      .then(data => {
        if (data.deletedCount > 0) {
          const userDetails = {
            status: 200,
            numberOfDelete: data.deletedCount,
            message: "Sucessfully record deleted"
          };
          res.status(200).send(userDetails);
        } else if (data.err) {
          res.status(200).send("error");
        } else {
          res.status(200).send({ status: 200, message: " User Not Found" });
        }
        res.status(500).send(err);
      })
      .catch(err => {
        const errDetails = {
          status: 500,
          message: "Internal Server Error - " + err.message
        };
        res.status(500).send(errDetails);
      });
  }

  /**
   * Update record using ID
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  updateRecord(req, res) {
    // Postman send data like this.
    //   {
    //     "firstName" : "Pratik",
    //     "lastName" : "Prajapati",
    //     "email" :"viju@gmail.com"
    // }

    const values = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    getQuery
      .updateUserDetails(Users, values, req.params.id)
      .then(data => {
        if (data.status === 409) {
          let response = {
            status: 409,
            message: "This email is already registered"
          };
          return res.status(409).send(response);
        }
        if (data.status === 400) {
          let response = {
            status: 400,
            message: "please enter valid email Id"
          };
          return res.status(400).send(response);
        }

        if (data.nModified > 0 && data.n > 0 && data.ok > 0) {
          const userDetails = {
            status: 200,
            message: "Sucessfully record Updated"
          };
          res.status(200).send(userDetails);
          return;
        } else {
          res.status(200).send({
            status: 200,
            "message ": "Not Updated record Please change at least one field"
          });
        }
        // if(data.err){
        //   res.status(200).send('error');
        //   return;
        // }
      })
      .catch(err => {
        const arrDetails = {
          status: 500,
          message: "Internal Server Error - " + err.message
        };
        return res.status(500).send(arrDetails);
      });
  }

  /**
   * New Create User
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  dynamicCreateNewUser(req, res) {
    getQuery
      .dynamicCreateNewUser(Users, req)
      .then(data => {
        if (data.status === 409) {
          let response = {
            status: 409,
            message: "This email is already registered"
          };
          return res.status(409).send(response);
        }
        if (data.status === 400) {
          let response = {
            status: 400,
            message: "Bad request - Please fill right field"
          };
          return res.status(400).send(response);
        }
        if (data.status === 406) {
          let response = {
            status: 406,
            message: "Please enter Strong password",
            required:
              "minmum 8 length, One Digit,One Special charactor,One Capital and small"
          };
          return res.status(406).send(response);
        }
        let response = {
          status: 200,
          data: data,
          message: "User Add sucessfully"
        };
        res.status(200).send(response);
      })
      .catch(err => {
        const error = {
          status: 500,
          message: "Internal Server Error - " + err.message
        };
        res.status(500).send(error);
      });
  }

  /**
   * Find all Users
   * @author Vijay Prajapati
   */

  async all(req, res) {
    // const data = await getQuery.findUsers();
    const data = await getQuery.findUsers();
    const data2 = {
      status: 200,
      users: data,
      message: "success"
    };
    res.status(200).send(data2);
  }

  /**
   *
   * Find Users using by ID
   * @author Vijay Prajapati
   *
   */

  async viewOne(req, res) {
    const data = await getQuery.findUsersId(req.params.id);
    if (data.err) {
      res.status(200).send("Somthing wrong");
    }
    if (data.length > 0) {
      const userDetails = {
        status: 200,
        data: data,
        length: data.length,
        message: "User find"
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

  async create(req, res) {
    const data = await getQuery.createNewUser(req);
    let response = {
      status: 200,
      data: data,
      message: "User Add sucessfully"
    };
    res.status(200).send(response);
  }

  /**
   * Edit user details using ID
   * @author Vijay Prajapati
   */
  edit(req, res) {
    res.send("Todo " + req.params.id + " updated");
  }
  /**
   * Unkonw API
   * @author Vijay Prajapati
   */
  notFoundApi(req, res) {
    const data = {
      status: 404,
      error: "404 Rest API Not Found"
    };
    res.status(404).send(data);
  }

  /**
   * Delete record using ID
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  destroy(req, res) {
    Users.deleteOne({ _id: req.params.id });
    res.send("Todo " + req.params.id + " delete");
  }
}

module.exports = UserDataclass;
