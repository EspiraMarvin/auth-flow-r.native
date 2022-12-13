import AsyncStorage from "@react-native-async-storage/async-storage"

import { createContext, useState } from "react"

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  setToken: () => {},
  logout: () => {},
})

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null)

  function setToken(token) {
    setAuthToken(token)
    AsyncStorage.setItem("react-native-auth-token", token)
  }

  function logout() {
    setAuthToken(null)
    AsyncStorage.removeItem("react-native-auth-token")
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    setToken: setToken,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
