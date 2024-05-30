import mongoose from 'mongoose';
import Recipe from '../models/RecipeModel.js'
import User from '../models/UserModel.js'
import multer from 'multer'
// all recipe found on database also have name of user store in user field by populate method
export const getAllRecipes = async (req,res)=>{
    try {
            const allRecipes = await Recipe.find().sort({ createdAt: -1 });
            res.status(200).json(allRecipes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// specific recipe
export const getOneRecipe=async (req,res)=>{
    const {id}=req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: "invalid id" });
    }
    try {
        const recipe = await Recipe.findById(id)
        if(!recipe){
            return res.status(404).json({ message: "recipe not found" });
        }
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// for each user
export const getUserRecipes=async (req, res) => {
    const user_id=req.user._id
    try {
        const recipes = await Recipe.find({user_id: user_id }).sort({createdAt:-1})
        console.log(recipes)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// create 
export const createRecipe =async (req, res) => {
    const user_id=req.user._id
    const {title, description, image}=req.body
    const newRecipe={
        title:title,
       description: description,
       image: image?image:null,
       user_id: user_id,
    }
    try {
        const recipe = await Recipe.create(newRecipe)
        res.status(201).json(recipe)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// delete
export const deleteRecipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "invalid id" });
    }
    try {
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return res.status(404).json({ message: "recipe not found" });
        }
        await Recipe.findByIdAndDelete(id)
        res.status(200).json({ message: "recipe deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// edit
export const editRecipe = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: "invalid id" });
    }
    
    try {
        let updateFields = req.body;

        const recipe = await Recipe.findByIdAndUpdate(id, updateFields, {
          new: true,
        });
        if(!recipe){
            return res.status(404).json({ message: "recipe not found" });
        }
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// like recipe or unlike it
export const likeRecipe = async (req, res) => {
  const { id } = req.params;
  const user_id=req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid id" });
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const userIndex = recipe.likedBy.indexOf(user_id);

    if (userIndex === -1) {
      recipe.likes += 1;
      recipe.likedBy.push(user_id);
    } else {
      recipe.likes -= 1;
      recipe.likedBy.splice(userIndex, 1);
    }

    await recipe.save();
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
