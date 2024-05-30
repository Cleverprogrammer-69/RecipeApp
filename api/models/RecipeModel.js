import mongoose from "mongoose";
const Schema=mongoose.Schema
const RecipeSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:"User",
        },
    ]
    ,
    user_id:{
        type:String,
        required:true
    }

},{timestamps:true})
export default mongoose.model("Recipe", RecipeSchema);