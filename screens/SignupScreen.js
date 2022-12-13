import { useState, useContext } from "react"
import { Alert } from "react-native"

import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/Ui/LoadingOverlay"

import { AuthContext } from "../store/context/auth-context"
import { createUser } from "../utils/auth"

export default function SignupScreen() {
  const { setToken } = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      // navigation.navigate("Login")
      setToken(token)
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your inputs or try again later"
      )
      // console.log("error", error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }
  return <AuthContent onAuthenticate={signupHandler} />
}
