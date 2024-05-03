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
    newReview.username = req.user.username
    newReview.voteStatus = 0
    newReview.votes = { upVotes: 0, downVotes: 0 }
    return res.status(201).json({ review: newReview })
  } catch(error) {
    res.status(500).json({ error:error })
  }
})

sandwichReviewsRouter.delete("/", async (req, res) => {
  try{
    const { reviewId } = req.body
    const review = await Review.query().findById(reviewId)
    await review.$relatedQuery("votes").delete()
    await Review.query().deleteById(reviewId)
    res.status(200).json({})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default sandwichReviewsRouter