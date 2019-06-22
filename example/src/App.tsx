import React from 'react'
import './App.css'
import { openPopup } from './Popup'

const App: React.FC = () => {
  return (
    <div className="App">
      <button onClick={() => openPopup({})}>Open popup</button>
    </div>
  )
}

export default App
