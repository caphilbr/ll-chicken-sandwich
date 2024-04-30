import express from "express"
import { Sandwich } from "../../../models/index.js"

const sandwichesRouter = new express.Router()

sandwichesRouter.get("/", async (req,res) => {
  try{
    const sandwiches = await Sandwich.query()
    res.status(200).json({ sandwiches })
  } catch(error){
    res.status(500).json({ errors: error })
  }
})

export default sandwichesRouter