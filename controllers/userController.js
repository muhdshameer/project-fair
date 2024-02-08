//import model
const users =require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//logic for register
exports.register =async(req,res)=>{
    //logic
    console.log('inside userController-register logic');

 //destructing data from client request body(since json formate is converted into javascript object bt the .json() method used in index.js file)
    const {username,email,password}= req.body
 

 try{ //since email is the unique value we are checking that email is already parent in the database
   // for that we are using findOne method which return entire document when the condition is true else return null 
      const existingUser  = await  users.findOne({email})

      if(existingUser ){
        //if findOne return document it means that the users already exist
        //so we are sending a response in the 400 serios (client request error)
        res.status(406).json('Acoount already Exist...please Login')
      }
      else{
      //if findOne return null , it mean the email or the user doesnot exist in the database
      //we register the user
         
        //1)create object for the modal
      const newUser = new users({
        username,
        email,
        password,
        github:"",
        linkdin:"",
        profile:"",
      })
      //2) add the object use save ()method in mongoose
      await newUser.save()
     
    //response
    res.status(200).json(newUser)
  }
}
//javascirpt rsolve runtime erros using try-catch block
catch(err){
    res.status(401).json('Register Request FAILED due to',err)
 }


}


//logic  for login
exports.login =async (req, res)=>{
    console.log('inside login function');
   

    const {email,password} = req.body

  try{const existingUser= await users.findOne({email,password})

   if(existingUser){
   //sign is the function of used to create token
   //first arguments -payload - the information that is secretly transimitted
   //second arg - secrect key - based on which the token is genarated
    const token = jwt.sign({userId: existingUser._id},"supersecretekey12345")
      res.status(200).json({
        existingUser,  //jwt json web  token -it define a compact and self contain securlt transmitting information   between partys and json object
        token
      })
   }
   else{
         res.status(404).json('invalid email id or password')
   }
}
catch(err){
    res.status(401).json('Login request failed due to :',err)
}
}


//edit profile

exports.editUser = async(req,res)=>{
  const userId = req.payload
  const{username,email,password,github,linkdin,profile}=req.body

const profileImage = req.file?req.file.filename:profile

try {
     const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkdin,profile:profileImage},{new:true})

await updateUser.save()
res.status(200).json(updateUser)

}catch (err) {
  res.status(401).json(err)
}

}