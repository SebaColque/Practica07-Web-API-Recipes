import React, { useContext, useState } from 'react'
import { HashRouter, Route, Routes } from "react-router-dom"
import NavMenu from './components/NavMenu';
import PrivateRoute from './components/PrivateRoute';
import UserContext from './context/userContext';
import CreateRecipe from './pages/CreateRecipe';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import MyRecipes from './pages/MyRecipes';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">

      <HashRouter>

        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<Home />} />

          < Route element={< PrivateRoute isAllowed={!!user} /> } >
            <Route path="/my-recipes" element={ < MyRecipes />} />
            <Route path="/create-recipe" element={ < CreateRecipe />} />
          </Route>

        </Routes>

      </HashRouter>
    </div>
  )
}

export default App