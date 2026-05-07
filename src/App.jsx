import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import {Login} from './components/Login.jsx'
function App() {
 

  return (
    <>
     <Routes>
      <Route path='/login' element={<Login />} />
     </Routes>
    </>
  )
}

export default App
