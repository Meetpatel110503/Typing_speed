import React, { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Loader from "./components/Loading"
import { ColorProvider } from "./context/ColorContext"
const LandingPage = lazy(() => import("./components/LandingPage"))
const TypingSpeedChecker = lazy(() => import("./components/TypingSpeedChecker"))

const App = () => {
  return (
    <ColorProvider>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<LandingPage />} />{" "}
        </Routes>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path='/typing-test/:difficulty'
            element={<TypingSpeedChecker />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </ColorProvider>
  )
}

export default App
