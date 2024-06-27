// App.js
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import TypingSpeedChecker from "./components/TypingSpeedChecker"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/typing-test/:difficulty'
          element={<TypingSpeedChecker />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
