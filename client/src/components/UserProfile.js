import React, { useState, useEffect } from "react"
import Dropzone from "react-dropzone"

const UserProfile = ({ user }) => {
  const [userPhoto, setUserPhoto] = useState("")
  const [newUserPhotoFormData, setNewUserPhotoFormData] = useState({
    image: {}
  })

  const getUserPhoto = async () => {
    try {
        const response = await fetch("/api/v1/user-photos")
        if (!response.ok) {
          throw new Error (`${response.status} (${response.statusText})`)
        }
        if (!(response.status === 204)) {
          const body = await response.json()
          setUserPhoto(body.userPhoto)
        }
    } catch (error) {
      console.error(`Error in getUserPhoto Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getUserPhoto()
  }, [])

  const handleUserPhotoUpload = (acceptedImage) => {
    setNewUserPhotoFormData({ image: acceptedImage[0] })
  }

  const addUserPhoto = async (event) => {
    event.preventDefault()
    const newUserPhotoBody = new FormData()
    newUserPhotoBody.append("image", newUserPhotoFormData.image)

    try {
      const response = await fetch("/api/v1/user-photos", {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newUserPhotoBody
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setUserPhoto(body.userPhoto)
    } catch (error) {
      console.error(`Error in addUserPhoto Fetch: ${error.message}`)
    }
  }
  return (
    <>
      {user ? 
      <>
        <img src={userPhoto} className="profile-photo" />
        <h1>{user.username}'s Homepage</h1>
        <h4>Username:</h4>
        <p>{user.username}</p>
        <h4>Email:</h4>
        <p>{user.email}</p>
      </> : <h1>You need to be logged in to see this page.</h1>}
      <form className="callout primary" onSubmit={addUserPhoto}>    
        <Dropzone onDrop={handleUserPhotoUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Your UserPhoto - drag 'n' drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
        <input className="button" type="submit" value="Add" />
      </form>
    </>
  )
}

export default UserProfile