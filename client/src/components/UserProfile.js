import React from "react"

const UserProfile = ({ user }) => {
  return (
    <>
      {user ? 
      <>  
        <h1>{user.username}'s Homepage</h1>
        <h4>Username:</h4>
        <p>{user.username}</p>
        <h4>Email:</h4>
        <p>{user.email}</p>
      </> : <h1>You need to be logged in to see this page.</h1>}
    </>
  )
}

export default UserProfile