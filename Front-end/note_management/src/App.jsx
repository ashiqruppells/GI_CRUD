import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DashboardRouter from './components/routers/router/DashboardRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DashboardRouter />
    </>
  )
}

export default App
