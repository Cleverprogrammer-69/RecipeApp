import { useSignup } from "../hooks/useSignup";
 import React,{useState} from 'react'
import {Link} from 'react-router-dom'
 const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const{signup, error, isLoading}=useSignup()
  const SubmitHandler=async(e)=>{
    e.preventDefault()
    await signup(name,email,password)
    console.log(name,email,password)
  }
   return (
     <div>
       <form className="signup" onSubmit={SubmitHandler}>
         <h3>Sign up</h3>
         <label>Name:</label>
         <input
           type="text"
           required
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
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
         <p id="SignupMsg">
           Already a Member <Link to="/login">Login here</Link>{" "}
         </p>
         <button disabled={isLoading} type="submit">
           Signup
         </button>
         {error && <div className="error">{error}</div>}
       </form>
     </div>
   );
 }
 
 export default Signup
 