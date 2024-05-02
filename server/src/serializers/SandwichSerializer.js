import ReviewSerializer from "./ReviewSerializer.js"

class SandwichSerializer {
  static summaryForIndex = (sandwiches) => {
    const allowedFields = ["id", "name", "restaurant"]
    const serializedSandwiches = sandwiches.map(sandwich => {
      const serializedSandwich = {}
      allowedFields.forEach(field => {
        serializedSandwich[field] = sandwich[field]
      })
      return serializedSandwich
    })
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
    serializedSandwich.reviews = await ReviewSerializer.summaryForShow(relatedReviews, userId)
    return serializedSandwich
  }
}

export default SandwichSerializer