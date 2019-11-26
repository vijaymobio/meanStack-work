var express = require('express')
const userData =  require('../controller/usersData');
const auth =  require('../controller/auth');
const app = express();

// Users routes 
app.get('', [userData.all])
app.post('/user/create',[userData.create])
app.delete('/user/delete/:id',[userData.destroy])
app.get('/user/edit/:id',[userData.edit])
app.get('/user/:id', [userData.viewOne])
app.post('/login', function(req, res) {
    auth.login(req,res);
});
app.all('*',(req,res) => {
    res.status(404).send('404 Page Not Found');
  });

// authentication route

module.exports = app