//model mongoose


const mongoose =require('mongoose')

//import validator
const validator =require('validator')

//Create schema - use schema class in mongoose
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:['3','must be atleast 3 charecter, got only {value}',]
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkdin:{
    type:String
    },
    profile:{
        type:String
    }

})




//create model
const users = mongoose.model("users",userSchema)

//export the modal
module.exports =users