import express from "express"
import { Review } from "../../../models/index.js"
import { ValidationError } from "objection"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const review = await Review.query().findById(req.params.id)
    await review.$relatedQuery("votes").delete()
    await Review.query().deleteById(req.params.id)
    res.status(200).json({})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

reviewsRouter.patch("/:id", async (req, res) => {
  try {
    const { title, body, starRating } = req.body
    const existingReview = await Review.query().findById(req.params.id)
    const updatedReview = {
      ...existingReview,
      title: title,
      body: body,
      starRating: starRating
    }
    const persistedUpdate = await Review.query().updateAndFetchById(req.params.id, updatedReview)
    res.status(200).json({ review: persistedUpdate })
  } catch(error) {
    if (error instanceof ValidationError) {
      res.status(422).json( {errors: error.data })
    } else {
      res.status(500).json( { error } )
    }
  }
})

export default reviewsRouter