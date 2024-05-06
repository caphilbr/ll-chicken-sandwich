import express from "express";
import { User } from "../../../models/index.js";

const userProfileRouter = new express.Router({ mergeParams: true })

userProfileRouter.get("/page", async (req,res) => {
  try {
    const user = await User.query().findById(req.params.id)
    res.status(200).json({ user: user })
  } catch(error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default userProfileRouter