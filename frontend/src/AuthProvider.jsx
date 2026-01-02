import React from 'react'
import { useState, createContext } from 'react'

// Create the Context
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('access')
    )
  return (
    <>
      <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider
export {AuthContext}