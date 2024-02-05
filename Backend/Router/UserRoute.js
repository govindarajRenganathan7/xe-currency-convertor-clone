const express = require('express');
const userModel = require('../models/userModel');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = `iamawebdeveloperiamgoingtousejsonwebtokentosecret`



Router.post('/signin', async(req, res) => {
    try{
        const {phone_number, password} = req.body;

        if(phone_number == ""){
            return res.status(401).json({message:"Please enter the phone number."})
        }
        if(password == ""){
            return res.status(401).json({message:"Please enter the password."})
        }
        const existingUser = await userModel.findOne({phone_number:phone_number})
        if(!existingUser){
          return  res.status(404).json({message:`User not registered.`})
        }
        const matchedPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchedPassword){
           return res.status(401).json({message: "Password inccorect."})
        }
        const token = () => {
            return jwt.sign(existingUser.user_name, SECRET);
        }     
        const newToken = token();    
        return res.status(200).json({success:true, message:newToken})
    }catch(err){
      return  res.status(500).json({message:"Somthing went Wrong/n"+`error:${err}`})
    }
    });

Router.post('/signup', async(req,res) =>{
    try{
        const {user_name, phone_number, email, password } = req.body;
        if(user_name == ""){
            return res.status(401).json({message:"Please enter the user name."})
        }
        if(phone_number == ""){
            return res.status(401).json({message:"Please enter the phone number."})
        }
        if(email == ""){
            return res.status(401).json({message:"Please enter the email."})
        }
        if(password == ""){
            return res.status(401).json({message:"Please enter the password."})
        }
        //existing user find
        const ExistingUser = await userModel.findOne({
        $or: [
        {user_name:user_name},
        {phone_number: phone_number},
        {email: email},
    ]
})
if(ExistingUser){
  return  res.status(409).json({message:'User already registerd.'});
}
const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{8,}$/

if(!passwordRegex.test(password)){
   return res.status(406).json({message:"Password must contain atleast one symbol and eight character."})
}
 bcrypt.hash(password, 10, (err, hash) =>{
    if(err){
       return res.status(500).json({message:"Internal server error."})
    }
    var Hashedpassword = hash;
const phoneNumberRegex = /^[0-9]{10,}$/
    
if(!phoneNumberRegex.test(phone_number)){
    return res.status(406).json({message:"Please provide valid phone number."})
}
const emailRegex = /^\S+@\S+.com$/;
if(!emailRegex.test(email)){
    return res.status(406).json({message:"provide valid email"});
}
    const NewUser = new userModel({
        user_name : user_name,
        phone_number : phone_number,
        password : Hashedpassword,
        email : email,
    })
    
    NewUser.save().then(() =>{
   return res.status(201).json({message: "user Created successully"})
    })
})
}catch(err){
        console.error(err)
       return  res.status(500).json({message:`Error;${err}`})
    }
});



module.exports = Router;