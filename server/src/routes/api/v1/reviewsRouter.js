import express from "express"
import { Review } from "../../../models/index.js"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
  try{
    const review = await Review.query().findById(req.params.id)
    await review.$relatedQuery("votes").delete()
    await Review.query().deleteById(req.params.id)
    res.status(200).json({})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default reviewsRouter