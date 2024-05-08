import express from "express"
import uploadImage from "../../../Services/uploadImage.js"
import { User } from "../../../models/index.js"

const userPhotosRouter = new express.Router()

userPhotosRouter.get("/", async (req, res) => {
  try {
      if (req.user) {
        const userPhoto = req.user.image
        if (userPhoto) {
          res.status(200).json({ userPhoto })
        } else {
          res.status(204).json({})
        }
      } else {
        res.status(401).json({})
      } 
    } catch(error) {
        console.log(error)
        res.status(500).json({ errors: error })
      }
  })

userPhotosRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    if (req.user) {      
      const currentUserNewPhoto = {
        ...req.user,
        image: req.file.location
      }
      const updatedUser = await User.query().updateAndFetchById(req.user.id, currentUserNewPhoto)
      return res.status(201).json({ userPhoto: updatedUser.image })
    } else {
      res.status(401).json({})
    }
  } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: error })
    }
})

export default userPhotosRouter