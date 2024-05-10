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
    setNewUserPhotoFormData({
      ...newUserPhotoFormData,
      image: acceptedImage[0]
    })
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

  let uploadButton = null
  let uploadMessage = "Click here to select a photo to use as your profile picture"
  let fileStyle = "select-file-box"
  if (newUserPhotoFormData.image.name) {
    uploadMessage = newUserPhotoFormData.image.name
    uploadButton = <input className="button" type="submit" value="Upload Photo" />
    fileStyle = "show-file-box"
  }

  let profilePic = <span className="no-profile-photo">No profile picture uploaded yet...</span>
  if (userPhoto != "") {
    profilePic = <img src={userPhoto} className="profile-photo" />
  }

  return (
    <>
      {user ? 
      <div className="grid-x grid-padding-x profile-page">
        <div className="cell small-3 align-center">
          {profilePic}
          <form onSubmit={addUserPhoto}>
            <div className={fileStyle} >
              <Dropzone onDrop={handleUserPhotoUpload}>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>{uploadMessage}</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {uploadButton}
          </form>
        </div>
        <div className="cell small-9">
          <h1>{user.username}'s Homepage</h1>
          <h4>Username:</h4>
          <p>{user.username}</p>
          <h4>Email:</h4>
          <p>{user.email}</p>
        </div>
      </div> : <h1>You need to be logged in to see this page.</h1>}
    </>
  )
}

export default UserProfile