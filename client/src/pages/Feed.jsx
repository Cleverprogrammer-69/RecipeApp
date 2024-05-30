import React,{useEffect, useState} from 'react'
import { fetchAllRecipes } from '../api/apiCalls'
import { useRecipeContext } from '../hooks/useRecipeContext'
import RecipeList from '../components/RecipeList'
import { useAuthContext } from '../hooks/useAuthContext'
import { ClipLoader, GridLoader } from 'react-spinners';

const Feed = () => {
  const { user } = useAuthContext();
  const {dispatch,recipes}=useRecipeContext()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if(!user) return;
    fetchAllRecipes(dispatch,user)
    setIsLoading(false)
  }, [dispatch,user])
  
  return (
    <div className='feed page'>
      <h1 className='pageHeadings'>Feed</h1>
      {isLoading && <ClipLoader color={'#f9ca24'} size={100} /> }{/* Replace with your desired spinner */}
      {/* Or other options: */}
      {/* <CirclesToSquares color={'#36b9cc'} size={100} /> */}
      {/* <GridLoader color={'#123abc'} size={120} /> */}
      {recipes&&recipes.map(recipe=><RecipeList key={recipe._id} recipe={recipe} editActions={false} />)}
      {recipes.length===0&&<h3 className='pageHeadings'>Nothing to show here!</h3>}
    </div>
  )
}

export default Feed
