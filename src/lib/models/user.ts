import mongoose from 'mongoose';

const schema= new mongoose.Schema({
    name :{
        require:true ,
        type:String, // Allow null for name
    },
    email:{
        require:true ,
        type:String,
        unique:true,
    },
    password:{
        require:true ,
        type:String,
    }
});


const User= mongoose.models.User || mongoose.model('User',schema);
export {User};