import { useState } from 'react'
import './App.css'
import { Routes,Route } from "react-router-dom"
import ListItem from './components/ListItem'

function App() {
  const [count, setCount] = useState(0)

  


  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<ListItem />}/>
        </Routes>
      </div>
      <p className="read-the-docs">
      
      </p>
    </>
  )
}

export default App
