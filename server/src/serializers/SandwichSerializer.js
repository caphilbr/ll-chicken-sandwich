import ReviewSerializer from "./ReviewSerializer.js"

class SandwichSerializer {
  static summaryForIndex = async sandwiches => {
    const allowedFields = ["id", "name", "restaurant", "imgUrl"]
    const serializedSandwiches = Promise.all(sandwiches.map(async sandwich => {
      const serializedSandwich = {}
      allowedFields.forEach(field => {
        serializedSandwich[field] = sandwich[field]
      })
      serializedSandwich.averageRating = await sandwich.$averageRating()
      return serializedSandwich
    }))
    return serializedSandwiches 
  }
  
  static summaryForShow = async (sandwich, userId) => {
    const allowedSandwichFields = [
      "id",
      "name",
      "description",
      "imgUrl",
      "restaurant"
    ]
    const serializedSandwich = {}
    allowedSandwichFields.forEach(field => {
      serializedSandwich[field] = sandwich[field]
    })
    const relatedReviews = await sandwich.$relatedQuery("reviews")
    serializedSandwich.reviews = await ReviewSerializer.summaryForShow(
      relatedReviews,
      userId
    )
    serializedSandwich.averageRating = await sandwich.$averageRating()
    return serializedSandwich
  }
}

export default SandwichSerializer