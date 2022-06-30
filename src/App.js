import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/create-post/CreatePost'
import AddBeat from './pages/add-beat/AddBeat'
import LandingPage from './pages/landing-page/LandingPage'
import Landing from './pages/landing-page/Landing'
import PostDetails from './pages/post-details/PostDetails'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import { Navbar } from './images/layout/navbar/Navbar'
import Rightbar from './components/Rightbar'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import logo from './images/logo_official.png'
import { UAuthMoralisConnector } from '@uauth/moralis'
import { useMoralis } from 'react-moralis'
import { uauth } from './connectors'
import UAuth from '@uauth/js'

const App = () => {
  const { isAuthenticated, logout, authenticate } = useMoralis()
  const uauthMoralisConnector = new UAuthMoralisConnector()
  const [udUser, setudUser] = useState('')
  const [wallet, setWallet] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [currentPost, setCurrentPost] = useState('')

  useEffect(() => {
    const getUdNameLocal = localStorage.getItem('udName')
    setudUser(getUdNameLocal)
  }, [udUser])

  const unstoppableLogin = new UAuth({
    clientID: '7fdc9f08-e848-415e-868d-3fd36af6a8ce',
    scope: 'openid email wallet',
    redirectUri: 'http://localhost:3000/',
  })

  const userLogIn = async () => {
    try {
      const userUnstopple = await unstoppableLogin.loginWithPopup()

      let user = await authenticate(uauth)
      console.log('🚀 ~ file: App.js ~ line 42 ~ userLogIn ~ user', user)
      let domainDetials = uauthMoralisConnector.uauth.user()
      const udName = (await domainDetials).sub
      console.log('is This  udName', udName)
      const wallet = (await domainDetials).wallet_address

      setWallet(wallet)
      setUserInfo(userUnstopple)

      if (udName) {
        localStorage.setItem('udName', udName)
      }

      setudUser(udName)
    } catch (error) {
      console.log(error)
    }
  }
  const userLogOut = () => {
    localStorage.removeItem('udName')
    setudUser('')
    logout()
  }

  return (
    <>
      <Navbar udUser={udUser} userLogOut={userLogOut} />
      {isAuthenticated ? (
        <div className="page">
          <div className="">
            <Routes>
              <Route
                path="/"
                element={<LandingPage setCurrentPost={setCurrentPost} />}
              />
              <Route
                path="/store"
                element={<Home setCurrentPost={setCurrentPost} />}
              />
              <Route path="/add-beat" element={<AddBeat />} />
              <Route
                path="/details"
                element={
                  <PostDetails currentPost={currentPost} udUser={udUser} />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="loginPage">
          <h2> Log in to continue</h2>

          <Button
            onClick={userLogIn}
            variant="contained"
            style={{ backgroundColor: 'red' }}
            endIcon={<LoginIcon />}
          >
            Login
          </Button>
          <img
            src="https://duckduckgo.com/i/7f3d4ac9.png"
            height="200px"
            width="200px"
            className=""
            alt="Logo"
          />
        </div>
      )}
    </>
  )
}
export default App
