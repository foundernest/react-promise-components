import React from 'react'
import './App.css'
import { openPopup } from './Popup'

const App: React.FC = () => {
  return (
    <div className="App">
      <button onClick={async () => {
        await openPopup({})
        await openPopup({})
        await openPopup({})
      }}>Open sequence of popups</button>
    </div>
  )
}

export default App
