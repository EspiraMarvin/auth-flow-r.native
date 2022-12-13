import axios from "axios"

import { API_KEY, API_URL } from "@env"

export async function authenticate(mode, email, password) {
  const url = `${API_URL}:${mode}?key=${API_KEY}`

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  })

  // console.log("res data", response.data)

  const token = response.data.idToken

  return token
}

export async function createUser(email, password) {
  return await authenticate("signUp", email, password)
}

export async function logIn(email, password) {
  return await authenticate("signInWithPassword", email, password)
}
