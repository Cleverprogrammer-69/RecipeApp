import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { url } from "../api/apiCalls";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${url}/api/user/signup`,
        {name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        // Save the user to localStorage
        localStorage.setItem("user", JSON.stringify(json));
        // Update Auth Context
        dispatch({ type: "LOGIN", payload: json });
        console.log(localStorage.getItem("user"));
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
