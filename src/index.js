import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import ParentTeacherRegistration from './components/ParentTeacherRegistration'
import './styles/main.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/parent-teacher-registration' element={<ParentTeacherRegistration />} />
      </Routes>
    </Router>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
