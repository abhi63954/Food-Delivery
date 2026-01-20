import userMOdel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt"
import validator from "validator";

// Login user
const loginUser = async (req, res) =>{
  const {email, password} = req.body;
  try {
    const user = await userMOdel.findOne({email});
    if(!user){
      return res.json({success:false, message:"User does not exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.json({success:false,message:"Invalid credentails"})
    }

    const token = createToken(user._id);
    res.json({success:true, token})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRETE)
}


//register User:
const registerUser = async (req, res) =>{
  const {name, password, email} = req.body;
  try {
    // checking is user already exist
    const exist = await userMOdel.findOne({email})
    if(exist){
      return res.json({success:false,message:"User already exists"})
    }
    // validating email format & strong password
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please Enter a valid email"})
    }

    if(password.length<8){
      return res.json({success:false,message:"Please enter strong password"})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userMOdel({
      name:name,
      email:email,
      password:hashedPassword
    })

    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})    
  }
}

export {loginUser, registerUser}