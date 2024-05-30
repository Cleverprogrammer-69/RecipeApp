import React, { useEffect } from 'react'
import { useRecipeContext } from '../hooks/useRecipeContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { fetchUserRecipes } from '../api/apiCalls'
import RecipeList from '../components/RecipeList'
const Profile = () => {
  const { userRecipes, dispatch } = useRecipeContext();
  const {user}=useAuthContext()
  useEffect(() => {
    if(!user)return
    fetchUserRecipes(dispatch,user)
  }, [dispatch,user])
  
  return (
    <div className="page">
      <h1 className="pageHeadings">Your Posts 👇👇</h1>
      {userRecipes &&
        userRecipes.map((recipe) => (
          <RecipeList key={recipe._id} recipe={recipe} editActions={true} />
        ))}
      {userRecipes.length === 0 && (
        <h3 className="pageHeadings">No posts yet!</h3>
      )}
    </div>
  );
}

export default Profile
