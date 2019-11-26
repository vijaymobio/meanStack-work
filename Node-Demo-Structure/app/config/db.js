// MongoDB Connection file
const mongoose =  require('mongoose')
mongoose.connect('mongodb://localhost:27017/CRM',{ useNewUrlParser: true , useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

module.exports = connection

