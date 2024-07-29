import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


//Login User
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }

        const token = createToken(user._id);
        res.status(200).json({success:true,token})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:true,message:"Something went wrong"})
    }
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


//Register User

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //Check if user already exist
        const emailExists = await userModel.findOne({email:email})
        if(emailExists){ 
            return res.json({success:false,message:"User with this email address already exist"})
        }

        //Validating email format & password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //Hashing user password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel ({
            name:name,
            email:email,
            password:hashedPassword  
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.status(201).json({success:true,token});
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Something went wrong"})
    }
}


export {loginUser,registerUser}