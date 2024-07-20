import { useLogin } from "../hooks/useLogin";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/feed"); // Redirect to feed page on successful login
    } catch (err) {
      console.error(err); // Handle error if login fails
    }
  };

  return (
    <div>
      <form className="login" onSubmit={SubmitHandler}>
        <h3>Login</h3>
        <label>Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p id="LoginMsg">
          Not a Member <Link to="/signup">Register here</Link>
        </p>
        <button disabled={isLoading} type="submit">
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
