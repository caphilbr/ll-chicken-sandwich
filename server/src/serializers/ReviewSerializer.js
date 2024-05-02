class ReviewSerializer {
  static summaryForShow = async (reviews, userId) => {
    const allowedReviewFields = [
      "id",
      "createdAt",
      "body",
      "starRating",
      "title",
      "userId"
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
        const relatedVotesByUser = relatedVotes.filter(vote => vote.userId == userId)
        if (relatedVotesByUser.length === 0) {
          serializedReview.voteStatus = 0
        } else {
        serializedReview.voteStatus = relatedVotesByUser[0].voteStatus
        }
      }
      return serializedReview
    }))
    return serializedReviews
  }
}

export default ReviewSerializer