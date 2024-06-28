import React, { createContext, useState, useContext } from "react"

const ColorContext = createContext()

export const useColor = () => {
  return useContext(ColorContext)
}

export const ColorProvider = ({ children }) => {
  const [outerBgColor, setOuterBgColor] = useState("#f7f9f5")

  return (
    <ColorContext.Provider value={{ outerBgColor, setOuterBgColor }}>
      {children}
    </ColorContext.Provider>
  )
}
