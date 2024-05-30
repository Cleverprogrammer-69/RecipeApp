
import { useAuthContext } from "../hooks/useAuthContext";

export const url="http://localhost:4000"

export const fetchAllRecipes = async (dispatch,user) => {
  
  try {
    const response = await fetch(`${url}/api/recipes`,{
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    if(response.ok){
      const data = await response.json();
      dispatch({ type: "SET_RECIPES", payload: data });
    }
    } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
}

export const fetchOneRecipe = async (id, dispatch,user) => {
  try {
    const response = await fetch(`${url}/api/recipes/${id}`,{
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    const data = await response.json();
    dispatch({ type: "UPDATE_RECIPE", payload: data });
    return data
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
  }
};

export const fetchUserRecipes = async (dispatch,user) => {
  try {
    const response = await fetch(`${url}/api/recipes/user`,{
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    const data = await response.json();
    dispatch({ type: "SET_USER_RECIPES", payload: data });
  } catch (error) {
    console.error("Failed to fetch user recipes:", error);
  }
};

export const createRecipe = async (recipe, dispatch, user) => {
  console.log(recipe)
  try {
    const response = await fetch(`${url}/api/recipes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
       },
      body: JSON.stringify(recipe,user),
    });
    console.log("Response from server : ", response)
    const data = await response.json();
    console.log("Parsed data : ", data)
    dispatch({ type: "CREATE_RECIPE", payload: data });
  } catch (error) {
    console.error("Failed to create recipe:", error);
  }
};

export const deleteRecipe = async (id, dispatch, user) => {
  try {
    await fetch(`${url}/api/recipes/${id}`, { method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    dispatch({ type: "DELETE_RECIPE", payload: { _id: id } });
  } catch (error) {
    console.error("Failed to delete recipe:", error);
  }
};

export const editRecipe = async (id, updatedRecipe, dispatch, user) => {
  try {
    const response = await fetch(`${url}/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user.token}` },
      body: JSON.stringify(updatedRecipe),
    });
    const data = await response.json();
    dispatch({ type: "UPDATE_RECIPE", payload: data });
  } catch (error) {
    console.error("Failed to update recipe:", error);
  }
};

export const likeRecipe = async (id, dispatch, user) => {
  try {
    const response = await fetch(`${url}/api/recipes/like/${id}`, { method: "PUT", headers:{
      "Authorization": `Bearer ${user.token}`
    } });
    const data = await response.json();
    dispatch({ type: "UPDATE_RECIPE", payload: data });
  } catch (error) {
    console.error("Failed to like recipe:", error);
  }
};
