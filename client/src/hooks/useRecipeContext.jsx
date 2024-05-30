import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext.jsx";
export const useRecipeContext = ()=>{
    const context = useContext(RecipeContext);
    if(!context){
        throw new Error("useRecipeContext must be used within a RecipeProvider");
    }
    return context;
}