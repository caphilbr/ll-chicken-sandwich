import React from "react"

const UserProfile = (props) => {
  let user = {username:'', email:'', userId:''} 
  
  if (props.user){
    user = {username: props.user.username, email: props.user.email, userId: props.user.userId}
  }

  let notLoggedIn = <h1>You need to be logged in to see this page.</h1>

  const profilePage = (
    <>  
      <h1>{user.username}'s Homepage</h1>
      <h4>Username:</h4>
      <p>{user.username}</p>
      <h4>Email:</h4>
      <p>{user.email}</p>
    </>
  )

  return (
    <>
      {props.user ? profilePage : notLoggedIn}
    </>
  )
}

export default UserProfile