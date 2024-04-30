import express from "express"
import { Sandwich } from "../../../models/index.js"
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
    const serializedSandwich = SandwichSerializer.summaryForShow(sandwich)
    res.status(200).json({ sandwich: serializedSandwich })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

export default sandwichesRouter