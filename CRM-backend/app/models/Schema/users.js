import mongoose from 'mongoose';

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

export default mongoose.model('Users', Users);