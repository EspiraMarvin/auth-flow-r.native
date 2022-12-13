import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import AuthContextProvider, { AuthContext } from "./store/context/auth-context"
import { useContext, useEffect, useState } from "react"
import AppNavigation from "./navigations/AppNavigation"
import AsyncStorage from "@react-native-async-storage/async-storage"

SplashScreen.preventAutoHideAsync()

function Root() {
  const [isTryingLoading, setIsTryingLoading] = useState(true)
  const { setToken } = useContext(AuthContext)
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("react-native-auth-token")

      if (storedToken) {
        setToken(storedToken)
      }

      setIsTryingLoading(false)
    }

    fetchToken()
  }, [])

  if (!isTryingLoading) {
    SplashScreen.hideAsync()
  }

  return <AppNavigation />
}

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}
