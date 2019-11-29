
// -----------------------------------------------------------------------------------------------------
// Connection nodejs and mongoDB using mongoose
// -----------------------------------------------------------------------------------------------------

const mongoose =  require('mongoose')
mongoose.connect('mongodb://localhost:27017/CRM',{ useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// -----------------------------------------------------------------------------------------------------
// Connection nodejs and mongoDB using MongoClient
// -----------------------------------------------------------------------------------------------------//

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const url = 'mongodb://localhost:27017';
// const dbName = 'CRM';
// let collection;
// let db;
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
 
//    db = client.db(dbName);
//    collection = db.collection('users');
//    collection.find({}).toArray(function(err, docs) {
//     console.log("Found the following records");
//     console.log(docs)
//   });
//   client.close();
// });

module.exports = connection

