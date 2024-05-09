import express from "express";
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../Services/cleanUserInput.js";
import { Sandwich } from "../../../models/index.js";
import SandwichSerializer from "../../../serializers/SandwichSerializer.js";
import { ValidationError } from "objection";

const sandwichReviewsRouter = new express.Router({ mergeParams: true })

sandwichReviewsRouter.post("/", async (req, res) => {
  const { body } = req
  const sandwichId = parseInt(req.params.id)
  const formInput = cleanUserInput(body)
  formInput.starRating = parseInt(formInput.starRating)
  formInput.userId = parseInt(req.user.id)
  formInput.sandwichId = sandwichId

  try {
    const newReview = await Review.query().insertAndFetch(formInput)
    newReview.username = req.user.username
    newReview.voteStatus = 0
    newReview.votes = { upVotes: 0, downVotes: 0 }
    const sandwich = await Sandwich.query().findById(newReview.sandwichId)
    const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, req.user.id)
    return res.status(201).json({ review: newReview, sandwich: serializedSandwich })
  } catch(error) {
    if (error instanceof ValidationError) {
      res.status(422).json( {errors: error.data })
    } else {  
      res.status(500).json({ error:error })
    }
  }
})

export default sandwichReviewsRouter