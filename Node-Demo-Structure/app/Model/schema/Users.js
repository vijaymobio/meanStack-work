const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

//  let Users = new Schema({}, { strict: false });

module.exports = mongoose.model("users", Users);
