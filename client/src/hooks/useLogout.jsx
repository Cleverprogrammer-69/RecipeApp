import { useAuthContext } from "./useAuthContext";
import { useRecipeContext } from "./useRecipeContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: recipeDispatch } = useRecipeContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    recipeDispatch({ type: "SET_RECIPES", payload: null });
    console.log(`After logout ${localStorage.getItem("user")}`);
  };
  return { logout };
};
