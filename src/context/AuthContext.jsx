import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: "Demo User",
          email: email,
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        resolve(user)
      }, 1000)
    })
  }

  const register = async (name, email, password) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: name,
          email: email,
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        resolve(user)
      }, 1000)
    })
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
