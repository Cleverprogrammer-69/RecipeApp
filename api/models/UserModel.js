import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
const Schema=mongoose.Schema
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
UserSchema.statics.signup= async function (name, email, password){
    if(!email || !password || !name){
        throw new Error("Please provide all the details")
    }
    if(!validator.isEmail(email)){
        throw new Error("Please provide a valid email")
    }
    if(!validator.isAlpha(name)){
        throw new Error("Name can only have alphabets.")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please provide a strong password")
    }
    const emailFound=await this.findOne({ email})
    if(emailFound){
        throw new Error("Email already exists, please Login")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await this.create({ name, email, password: hashedPassword })
    return user
}
UserSchema.statics.login=async function (name, email, password){
    if( !email || !password){
        throw new Error("Please provide all the details")
    }
    const userFound=await this.findOne({ email})
    if(!userFound){ throw new Error("Please provide correct email")}
    const isMatch=await bcrypt.compare(password,userFound.password)
    if(!isMatch){
        throw new Error("Please provide correct password")
    }
    return userFound

}
export default mongoose.model("User",UserSchema)