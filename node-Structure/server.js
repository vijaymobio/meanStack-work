import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Users from './app/models/Schema/users';
import express from 'express';
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/CRM');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
router.route('').get((req, res) => {
res.send("Hello word")
});
router.route('/users').get((req, res) => {
    Users.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});
// router.route('/login/:id').get((req, res) => {
//     const id = Number(req.params.id);
//     console.log(id);
    
//    const user =  Users.find((err, users) =>  users._id === id)
//    res.send(user);
   
// });
// router.route('/login/:id').get((req, res) => {
//     Users.find({_id: req.params.id}, (err, user) => {
//         if (err)
//             res.json(err);
//         else
//             res.send(user);
//     })
// })

router.route('/login').post((req, res) => {
    let user = req.body;
    let upass =  user.password;
    
    Users.find({email: user.email,password:user.password}, (err, auth) => {           
        if (err){
            res.json(err);
        }
        else{
            if(auth.length <= 0){

                res.send({data:{
                
                    status:"false",
                    StatusCode:403,
                    message:"Email & password is incurrect"
                }});
            }
            else{
                let spass = auth[0].password;     
                if(upass === spass){
                    res.send({data:{auth},status:true,StatusCode:200})
                }else
                {
                   res.send({data:{
                    status:"false",
                    message:"Email & password is incurrect"
                }})

                }
            }
        }
    })
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));