import React, { useState, useEffect } from "react";
import {  editRecipe, fetchOneRecipe } from "../api/apiCalls";
import { useRecipeContext } from "../hooks/useRecipeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const RecipeEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false);
  const { dispatch, recipes, userRecipes } = useRecipeContext();
  const { user } = useAuthContext();
  const {id}=useParams()
  useEffect(() => {
    const fetchData=async()=>{
      setError(null)
      setIsLoading(true)
      try {
        let data = await fetchOneRecipe(id, dispatch, user);
        setTitle(data.title)
        setDescription(data.description)
        setImage(data.image)
        console.log(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    if(id){
      fetchData()
    }
  },[id])
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "recipe_imagesv1"); // Cloudinary upload preset
    console.log(formData);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dj7xzuf0j/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);

      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true)
    let imageUrl = "";
    if (image) {
      imageUrl = await handleImageUpload(image);
      console.log(imageUrl);
      if (!imageUrl) {
        setError("Failed to upload image. Please try again later.");
        return;
      }
    }

    const updatedRecipe = {
      title,
      description,
      image: imageUrl,
    };

    try {
      await editRecipe(id, updatedRecipe, dispatch, user);
      setSuccess(true);
    } catch (error) {
      setError("Error posting recipe.");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      <form className="recipeForm" onSubmit={handleSubmit}>
        <h3>Edit Recipe</h3>
        {error && <div className="error">{error}</div>}{" "}
        {/* Display error messages */}
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
        <button type="submit">Update</button>
        <h3>Fetched Image</h3>
        <img className="recipeImg" src={image} alt={title} />
        {success && <div className="error">Post Updated</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default RecipeEdit;
