import {createContext , useReducer} from 'react'
export const RecipeContext = createContext()
export const RecipeReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECIPES":
      return { ...state, recipes: action.payload };
    case "CREATE_RECIPE":
      return { ...state, recipes: [action.payload, ...state.recipes] };
    case "DELETE_RECIPE":
      // const recipesAfterDelete;
      // const userRecipesAfterDelete;
      return {
        ...state,
        userRecipes: state.userRecipes.filter(
          (recipe) => recipe._id !== action.payload._id
        ),
      };
    case "UPDATE_RECIPE":
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );
      const updatedUserRecipes = state.userRecipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );
      return {
        ...state,
        recipes: updatedRecipes,
        userRecipes: updatedUserRecipes,
      };
    case "SET_USER_RECIPES":
      return { ...state, userRecipes: action.payload };
    default:
      return state;
  }
};

 const RecipeContextProvider=({children})=>{
    const [state,dispatch]=useReducer(RecipeReducer,{
        recipes:[],
        userRecipes:[],
    })
    return (
        <div>
            <RecipeContext.Provider value={{...state,dispatch}}>
                {children}
            </RecipeContext.Provider>
        </div>
    )
}
export default RecipeContextProvider