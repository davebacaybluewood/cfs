import { AgentData } from "admin/pages/Agents/hooks/useFetchAgent"
import ENDPOINTS from "constants/endpoints"
import getUserToken from "helpers/getUserToken"
import React, { createContext, useEffect, useState } from "react"

type UserContextData = {
  loading: boolean
  error: boolean | null
  user: AgentData | undefined
}
export const UserContext = createContext<UserContextData>({
  error: false,
  loading: false,
  user: undefined,
})

function setSessionStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

function getSessionStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (e) {
    // if error, return initial value
    return initialValue
  }
}

const UserProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [data, setData] = useState(() =>
    getSessionStorage("userInfo", {
      loading: false,
      error: null,
      user: undefined,
    })
  )
  const localData = localStorage.getItem("userInfo")
  useEffect(() => {
    if (!("error" in data)) {
      setSessionStorage("userInfo", data)
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{ loading: data.loading, error: data.error, user: data }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
