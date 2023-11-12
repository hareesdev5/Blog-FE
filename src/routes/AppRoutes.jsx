import React from 'react'
import Blog from '../components/Blog'
import Create from '../components/Create'
import Dashboard from '../components/Dashboard'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Home from '../components/Home'
import Header from '../components/Header'
import { Routes,Route, Navigate } from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/dashboard' element={<><Header/><Dashboard/></>}/>
      <Route path='/create' element={<><Header/><Create/></>}/>
      <Route path='/blog/:id' element={<><Header/><Blog/></>}/>
      <Route path='/home' element={<><Header/><Home/></>}/>
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}

export default AppRoutes
