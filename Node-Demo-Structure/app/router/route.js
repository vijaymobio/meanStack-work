var express = require('express')
const userData =  require('../controller/usersData'); // Old Method
const userDataClass = require('../controller/userDataClass');
const auth =  require('../controller/auth');
const app = express();

const userDataclass = new userDataClass; 

// Users routes 
app.get('', userDataclass.all)
app.get('/dynamic', userDataclass.dynamicAll)
app.get('/rxjs', userDataclass.findData)

// app.delete('/dynamic/user/:id', function(req,res){
//     console.log(req.params.id);
    
//     userDataclass.dynamicDeleteById(req,res)
// })

app.get('/dynamic/:id', userDataclass.dynamicFindByField)
app.delete('/dynamic/delete/:id', function(req, res) {
    userDataclass.dynamicDeleteById(req,res)
});
app.post('/user/create', function(req, res) {
    userDataclass.create(req,res);
});
app.post('/dynamic/user/create', function(req, res) {
    userDataclass.dynamicCreateNewUser(req,res);
});
app.post('/dynamic/delete/choice',  function(req, res) {
    userDataclass.deleteMultipleRecord(req,res);
});
app.post('/dynamic/update/:id',  function(req, res) {
    userDataclass.updateRecord(req,res);
});
// app.post('/dynamic/update',  function(req, res) {
//     userDataclass.updateRecord(req,res);
// });
app.get('/user/delete/:id',userDataclass.destroy)
app.get('/user/edit/:id',userDataclass.edit)
app.get('/user/:id', userDataclass.viewOne)


// Authentication Route 
app.post('/dynamiclogin', function(req, res) {
    userDataclass.login(req,res);
});
app.post('/login', function(req, res) {
    auth.login(req,res);
});

// 404 API -  UnKnow API call Routed
app.all('*', userDataclass.notFoundApi);


module.exports = app
