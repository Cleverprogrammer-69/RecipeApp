import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import RecipeContextProvider from './context/RecipeContext.jsx'
import AuthContextProvider  from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <AuthContextProvider>
        <RecipeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecipeContextProvider>
      </AuthContextProvider>
    
  </React.StrictMode>
);
