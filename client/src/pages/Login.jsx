import { useLogin } from "../hooks/useLogin";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log( email, password);
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
          Not a Member <Link to="/signup">Register here</Link>{" "}
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
