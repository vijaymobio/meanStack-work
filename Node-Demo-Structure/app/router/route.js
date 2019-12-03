var express = require('express')
const userData =  require('../controller/usersData');
const userDataClass = require('../controller/userDataClass');
const auth =  require('../controller/auth');
const app = express();

const userDataclass = new userDataClass; 


// Users routes 
app.get('', userDataclass.all)
app.get('/dynamic', userDataclass.dynamicAll)

app.get('/dynamic/:id', userDataclass.dynamicFindByField)
app.get('/dynamic/delete/:id', userDataclass.dynamicDeleteById)
app.post('/user/create', function(req, res) {
    userDataclass.create(req,res);
});
app.post('/dynamic/delete/choice',  function(req, res) {
    userDataclass.deleteMultipleRecord(req,res);
});
app.get('/dynamic/update/:id',  function(req, res) {
    console.log('route called');
    
    userDataclass.updateRecord(req,res);
});
// app.post('/dynamic/update',  function(req, res) {
//     userDataclass.updateRecord(req,res);
// });
app.get('/user/delete/:id',userDataclass.destroy)
app.get('/user/edit/:id',userDataclass.edit)
app.get('/user/:id', userDataclass.viewOne)


// Authentication Route 
app.post('/login', function(req, res) {
    auth.login(req,res);
});

// 404 API -  UnKnow API call Routed
app.all('*', userDataclass.notFoundApi);


module.exports = app
