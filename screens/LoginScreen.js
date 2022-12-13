import { useState, useContext } from "react"
import { Alert } from "react-native"

import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/Ui/LoadingOverlay"

import { AuthContext } from "../store/context/auth-context"
import { logIn } from "../utils/auth"

export default function LoginScreen() {
  const { setToken } = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await logIn(email, password)
      setToken(token)
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials"
      )
      // console.log("error", error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />
}
