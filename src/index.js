import React from 'react'
import { createRoot } from 'react-dom/client'
import SignUp from './components/SignUp'
import './styles/main.css'

const App = () => {
  return (
    <div className='space-image'>
      <h1>Welcome to SafeSpace UI</h1>
      <SignUp />
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
