import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'
import {useAuthContext} from './hooks/useAuthContext'
import RecipeEdit from './pages/RecipeEdit'
import Welcome from './pages/Welcome'
// import { useNavigate } from 'react-router-dom'
function App() {
  const {user}=useAuthContext()
  const location=useLocation()
  // const Navigate=useNavigate()
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="pages">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="*"
            element={
              !user ? <Navigate to="/" /> : <Navigate to="/feed" />
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/feed" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/feed" />}
          />
          <Route
            path="/feed"
            element={user ? <Feed /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/newpost"
            element={user ? <NewPost /> : <Navigate to="/w" />}
          />
          <Route
            path="/editrecipe/:id"
            element={user ? <RecipeEdit /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App
