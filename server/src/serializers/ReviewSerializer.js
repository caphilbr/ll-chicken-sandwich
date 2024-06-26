class ReviewSerializer {
  static summaryForShow = async (reviews, userId) => {
    const allowedReviewFields = [
      "id",
      "createdAt",
      "body",
      "starRating",
      "title",
      "userId",
      "sandwichId"
    ]
    const serializedReviews = Promise.all(reviews.map(async review => {
      const serializedReview = {}
      allowedReviewFields.forEach( async field => {
        serializedReview[field] = review[field]
      })
      const relatedVotes = await review.$relatedQuery("votes")
      if (!relatedVotes) {
        serializedReview.voteStatus = 0
      } else {
        const relatedVotesByUser = relatedVotes.find(vote => vote.userId == userId)
        if (!relatedVotesByUser) {
          serializedReview.voteStatus = 0
        } else {
        serializedReview.voteStatus = relatedVotesByUser.voteStatus
        }
      }
      serializedReview.votes = await review.voteCount()
      const reviewUser = await review.$relatedQuery("user")
      serializedReview.username = reviewUser.username
      return serializedReview
    }))
    return serializedReviews
  }
}

export default ReviewSerializer