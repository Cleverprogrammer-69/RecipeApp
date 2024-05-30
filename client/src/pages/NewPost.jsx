import React, { useState } from "react";
import { createRecipe } from "../api/apiCalls";
import { useRecipeContext } from "../hooks/useRecipeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Alert from 'react-bootstrap/Alert'

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)
  const { dispatch } = useRecipeContext();
  const { user } = useAuthContext();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "recipe_imagesv1"); // Cloudinary upload preset
    console.log(formData)
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

    let imageUrl = "";
    if (image) {
      
      imageUrl = await handleImageUpload(image);
      console.log(imageUrl)
      if (!imageUrl) {
        setError("Failed to upload image. Please try again later.");
        return;
      }
    }

    const newRecipe = {
      title,
      description,
      image: imageUrl,
    };

    try{
      await createRecipe(newRecipe, dispatch, user);
      setSuccess(true)
    }catch(error){
      setError("Error posting recipe.")
    }
    
  };

  return (
    <div>
      <form className="recipeForm" onSubmit={handleSubmit}>
        <h3>Create New Recipe</h3>
        {error && <div className="error">{error}</div>}{" "}
        {/* Display error messages */}
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Create</button>
        {success && <div className="error">Post Created</div>}
        {error && <div className="error">{error}</div> }
      </form>
    </div>
  );
};

export default NewPost;
