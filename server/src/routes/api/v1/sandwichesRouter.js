import express from "express"
import { Sandwich } from "../../../models/index.js"
import cleanUserInput from "../../../Services/cleanUserInput.js"
import { ValidationError } from "objection"
import SandwichSerializer from "../../../serializers/SandwichSerializer.js"

const sandwichesRouter = new express.Router()

sandwichesRouter.get("/", async (req, res) => {
  try {
    const sandwiches = await Sandwich.query()
    const serializedSandwiches = SandwichSerializer.summaryForIndex(sandwiches)
    res.status(200).json({ sandwiches: serializedSandwiches })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

sandwichesRouter.get("/:id", async (req, res) => {
  try {
    const sandwich = await Sandwich.query().findById(req.params.id)
    const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich)
    res.status(200).json({ sandwich: serializedSandwich })
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