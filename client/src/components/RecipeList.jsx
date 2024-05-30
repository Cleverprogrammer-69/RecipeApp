import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { deleteRecipe, likeRecipe } from '../api/apiCalls'
import { useRecipeContext } from '../hooks/useRecipeContext'
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {useNavigate} from 'react-router-dom'
const RecipeList = (props) => {
  const {user}=useAuthContext()
  const {recipes,dispatch}=useRecipeContext()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const Navigate=useNavigate()
  const editHandler = async () => {
    if (!user) Navigate("/login");
    Navigate(`/editrecipe/${props.recipe._id}`);
  };
  const deleteHandler=async()=>{
    if(!user)return
    await deleteRecipe(props.recipe._id,dispatch,user)
  }
  const likeHandler=async()=>{
    if(!user)return
    try{
      await likeRecipe(props.recipe._id,dispatch,user)
      setSuccess(true)
    }catch(error){
      setError("Error occurred during like")
    }
  }
  return (
    <div className="recipe_details">
      {error && alert(error)}
      <h1>{props.recipe.title}</h1>
      <p>{props.recipe.description}</p>
      <img
        className="recipeImg"
        src={props.recipe.image}
        alt={props.recipe.title}
      />
      <div className="postActions">
        <div className='actionBtns'>
          {props.recipe.likedBy.includes(user.user._id) ? (
          <ThumbUpAltIcon onClick={likeHandler} />
          ) : (
          <ThumbUpOffAltIcon onClick={likeHandler} />
          )}
        <span>{props.recipe.likes} likes</span>
        </div>
        
        {props.editActions === true && (
          <div className="recipeActions">
            <button className="delete" onClick={deleteHandler}>
              Delete
            </button>
            <button className="updateRecipe" onClick={editHandler}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeList
