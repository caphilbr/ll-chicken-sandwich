class ReviewSerializer {
  static summaryForShow = async reviews => {
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
      allowedReviewFields.forEach(field => {
        serializedReview[field] = review[field]
      })
      const reviewUser = await review.$relatedQuery("user")
      serializedReview.username = reviewUser.username
      return serializedReview
    }))
    return serializedReviews
  }
}

export default ReviewSerializer