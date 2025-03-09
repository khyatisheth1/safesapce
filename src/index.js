import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import ParentTeacherRegistration from './components/ParentTeacherRegistration'
import CheckForFlaggedContent from './components/CheckForFlaggedContent'
import './styles/main.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignUp />} />
        <Route path='/parent-teacher-registration' element={<ParentTeacherRegistration />} />
        <Route path='/check-for-flagged-content' element={<CheckForFlaggedContent />} />
      </Routes>
    </Router>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
