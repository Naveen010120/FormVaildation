import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterForm from './Components/RegisterForm.jsx'
import App from './App.jsx'
import CardDetails from './Components/CardDetails.jsx'
import Login from './Components/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<RegisterForm />} />
    <Route path='/login' element={<Login />} />
    <Route path='/home' element={<App />} />
    <Route path='/cardDetails' element={<CardDetails/>} />
  </Routes>
  </BrowserRouter>
  </StrictMode>,
)
