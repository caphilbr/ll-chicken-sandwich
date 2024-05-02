import express from "express";
import { Review, User } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js";

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
    const user = await User.query().findById(formInput.userId)
    newReview.username = user.username
    return res.status(201).json({ review: newReview })
  } catch(error) {
    res.status(500).json({ error:error })
  }
})

export default sandwichReviewsRouter