const Users = require("../../Model/schema/Users");
const baseQuery = require("../../Repository/baseRepoClass");
const getQuery = new baseQuery();
require("dotenv").config();

module.exports = {
  /**
   * Find All user
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  all: function(req, res) {
    Users.find({}, { firstName: 1, lastName: 1 }, (err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
  },

  /**
   * Login User
   * @param {*} req
   * @param {*} res
   * @author Vijay Prajapati
   */
  login(req, res) {
    const auth = {
      email: req.body.email,
      password: req.body.password
    };
    getQuery
      .login(Users, auth)
      .then(data => {
        if (data.status === 401) {
          return res.status(401).send(data);
        }
        return res.status(200).send(data);
      })
      .catch(err => {
        const error = {
          status: 500,
          message: "Internal server Error - " + err.message
        };
        return res.status(500).send(error);
      });
  }
};
