import express from "express"
import Vote from "../../../models/Vote.js"
import Review from "../../../models/Review.js"

const votesRouter = new express.Router()

votesRouter.post("/", async (req, res) => {
  try{
    if (req.user) {
      const userId = parseInt(req.user.id)
      const reviewId = parseInt(req.body.reviewId)
      const voteStatus = parseInt(req.body.voteStatus)
      const existingVote = await Vote.query().findOne({userId: userId, reviewId: reviewId})
      let newStatus
      let voteCount
      if (!existingVote) {
        const newVote = await Vote.query().insertAndFetch({ userId: userId, reviewId: reviewId, voteStatus: voteStatus})
        newStatus = newVote.voteStatus
      } else {
        const updatedVote = await Vote.query().patchAndFetchById( existingVote.id, { voteStatus: voteStatus })
        const updatedReview = await Review.query().findById(updatedVote.reviewId)
        voteCount = await updatedReview.voteCount(updatedReview.id)
        newStatus = updatedVote.voteStatus
      }
      res.status(201).json({ voteStatus: newStatus, voteCount })
    } else {
      let notAuthorized = true
      res.status(401).json({ notAuthorized })
    }
  } catch (error) {
      res.status(500).json({ error })
  }
})

export default votesRouter