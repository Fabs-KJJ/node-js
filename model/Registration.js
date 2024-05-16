const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    firstname:{
        type: String,
        required:true,
    },
    lastname:{
        type: String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
});

const Registration= mongoose.model('registration', RegistrationSchema);
module.exports = Registration;
