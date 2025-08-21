import './App.css'
import Navbar from './Components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Resgister'
// import { useState } from 'react'
// import Modal from './components/Modal'

function App() {
  // const[isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login-page' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
       
    </>
  )
}

export default App