import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'
import RecipeEdit from './pages/RecipeEdit'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user, dispatch } = useAuthContext()
  const location = useLocation()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: storedUser })
    }
  }, [dispatch])

  const renderRoute = (path, element, redirectTo = '/') => (
    <Route
      path={path}
      element={user ? element : <Navigate to={redirectTo} />}
    />
  )

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
          {renderRoute('/feed', <Feed />)}
          {renderRoute('/profile', <Profile />)}
          {renderRoute('/newpost', <NewPost />)}
          {renderRoute('/editrecipe/:id', <RecipeEdit />)}
        </Routes>
      </div>
    </>
  )
}

export default App
