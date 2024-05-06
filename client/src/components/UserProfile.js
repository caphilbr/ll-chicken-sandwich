import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const UserProfile = (props) => {
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    cryptedPassword: "",
    username: ""
  })

  const getProfile = async () => {
    try {
      const response = await fetch(`/api/v1/users/${id}/page`)
      if(!response.ok) {
        const errorMessage =
          `Fetch error status ${response.status}: ${response.statusText}`
        const newError = new Error(errorMessage)
        throw(newError)
      } else {
        const parsedData = await response.json()
        setUserInfo(parsedData.user)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])
  
  return (
    <>
      <h1>{userInfo.username}'s Homepage</h1>
      <h4>Username:</h4>
      <p>{userInfo.username}</p>
      <h4>Email:</h4>
      <p>{userInfo.email}</p>
    </>
  )
}

export default UserProfile