var express = require('express')
const userData =  require('../controller/usersData');
const auth =  require('../controller/auth');
const app = express();
// Users routes 
app.get('', [userData.all])
app.post('/user/create', function(req, res) {
    userData.create(req,res);
});
app.get('/user/delete/:id',[userData.destroy])
app.get('/user/edit/:id',[userData.edit])
app.get('/user/:id', [userData.viewOne])
app.post('/login', function(req, res) {
    auth.login(req,res);
});
app.all('*',userData.notFoundApi);

// authentication route

module.exports = app
