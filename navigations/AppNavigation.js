import { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"
import WelcomeScreen from "../screens/WelcomeScreen"
import { Colors } from "../constants/styles"
import { AuthContext } from "../store/context/auth-context"
import IconButton from "../components/Ui/IconButton"

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          animation: "none",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          animation: "none",
        }}
      />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default function AppNavigation() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />} */}
      {!isAuthenticated && <AuthStack />}

      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}
