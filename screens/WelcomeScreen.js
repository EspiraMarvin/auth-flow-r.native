import { StyleSheet, Text, View } from "react-native"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../store/context/auth-context"

export default function WelcomeScreen() {
  const { token } = useContext(AuthContext)
  const [message, setMessage] = useState("")
  useEffect(() => {
    async function fetchMessage() {
      const res = await axios.get(
        `https://react-native-expenses-6a71f-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=${token}`
      )
      setMessage(res.data)
    }
    fetchMessage()
  }, [token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
})
