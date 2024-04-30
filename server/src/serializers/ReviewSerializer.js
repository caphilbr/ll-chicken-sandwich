class ReviewSerializer {
  static summaryForShow = (reviews) => {
    const allowedReviewFields = [
      "id",
      "createdAt",
      "body",
      "starRating",
      "title",
      "userId"]
    const serializedReviews = reviews.map(review => {
      const serializedReview = {}
      allowedReviewFields.forEach(field => {
        serializedReview[field] = review[field]
      })
      return serializedReview
    })
    return serializedReviews
  }
}

export default ReviewSerializer