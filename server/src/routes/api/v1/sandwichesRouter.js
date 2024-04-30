import express from "express"
import { Sandwich } from "../../../models/index.js"
import cleanUserInput from "../../../Services/cleanUserInput.js"
import { ValidationError } from "objection"

const sandwichesRouter = new express.Router()

sandwichesRouter.get("/", async (req,res) => {
  try {
    const sandwiches = await Sandwich.query()
    res.status(200).json({ sandwiches })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

sandwichesRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    const newSandwich = await Sandwich.query().insertAndFetch(formInput)
    res.status(201).json({ newSandwich })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json( {errors: error.data })
    } else {
      res.status(500).json( { error } )
    }
  }
})

export default sandwichesRouter