import { useState } from 'react'
import './App.css'
import Managerlocal from './components/Manager-local'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Managerlocal/>
    </>
  )
}

export default App
