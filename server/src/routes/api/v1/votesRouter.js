import express from "express"
import Vote from "../../../models/Vote.js"
import Review from "../../../models/Review.js"

const votesRouter = new express.Router()

votesRouter.post("/", async (req, res) => {
  try {
    if (req.user) {
      const userId = parseInt(req.user.id)
      const reviewId = parseInt(req.body.reviewId)
      const voteStatus = parseInt(req.body.voteStatus)
      const currentVote = await Vote.query().findOne({ userId, reviewId })
      const currentReview = await Review.query().findById(reviewId)
      let newStatus
      let voteCount
      if (!currentVote) {
        const newVote = await Vote.query().insertAndFetch({
          userId,
          reviewId,
          voteStatus
        })
        newStatus = newVote.voteStatus
      } else {
        const updatedVote = await Vote.query().patchAndFetchById(
          currentVote.id,
          { voteStatus }
        )
        newStatus = updatedVote.voteStatus
      }
      voteCount = await currentReview.voteCount()
      res.status(201).json({ voteStatus: newStatus, voteCount: voteCount })
    } else {
      res.status(401).json({})
    }
  } catch (error) {
      res.status(500).json({ error })
  }
})

export default votesRouter