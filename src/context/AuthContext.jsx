"use client"

import api from "@/lib/api"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulación de login

    const u = {
      email,
      password
    }
try {
   const res = await api.post("/login",{
        user: u
    })    
    console.log(res)
    const userData = res.data
    setUser(userData.user)
    localStorage.setItem("token", JSON.stringify(userData.accessToken))
    return true
} catch (error) {
  console.log(error)
}
   
  }

  const register = async (email, password, name) => {
    // Simulación de registro

        const u = {
      email,
      nombre: name,
      password
    }
try {
   const res = await api.post("/register",{
        user: u
    })    
    console.log(res)
    const userData = res.user
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
} catch (error) {
  console.log(error)
}
    const userData = { id: Date.now(), email, name }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
