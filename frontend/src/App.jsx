import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignUp'
import Home from './pages/home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import CapatainProtectedWrapper from './pages/CapatainProtectedWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/CaptainLogin" element={<CaptainLogin />} />
        <Route path="/CaptainSignup" element={<CaptainSignup />} />
        <Route path="/Home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>} />

        <Route path='/UserLogout' element={
        <UserProtectedWrapper>
          <UserLogout />
        </UserProtectedWrapper>} />
      <Route path='/CaptainHome' element={
        <CapatainProtectedWrapper>
          <CaptainHome />
        </CapatainProtectedWrapper>} />
      </Routes>
    </div>
  )
}

export default App