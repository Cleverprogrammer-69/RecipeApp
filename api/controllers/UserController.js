import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

const createToken=(_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:"3d"})
}
export const loginUser=async(req,res)=>{
    const {name, email, password}=req.body
    try {
        const user=await User.login(name,email,password)
        const token=createToken(user._id)
                console.log(req.body, user._id);

        res.status(200).json({email,name,token,user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const signupUser= async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const user=await User.signup(name,email,password)
        const token=createToken(user._id)
        console.log(req.body, user._id)
        res.status(200).json({email,name,token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}