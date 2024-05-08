const Model = require("./Model.js")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name", "restaurant"],
  identifiers: ["id"]
})

class Sandwich extends unique(Model) {
  static get tableName() {
    return "sandwiches"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "restaurant"],
      properties: {
        name: { type: "string", minLength: 1, maxLength: 150 },
        description: { type: "string", maxLength: 255 },
        restaurant: { type: "string", minLength: 1, maxLength: 150 },
        imgUrl: { type: "string" }
      }
    }
  }

  async $averageRating() {
    let sum = 0
    let average = 0
    const reviews = await this.$relatedQuery("reviews")
    if (reviews.length !== 0) {
      const ratingsArray = reviews.map(review => {
        return review.starRating
      })
      ratingsArray.forEach(rating => {
        sum += rating
      })
      average = sum/ratingsArray.length
    }
    return average
  }

  static get relationMappings() {
    const { Review } = require("./index.js")
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "sandwiches.id",
          to: "reviews.sandwichId"
        }
      }
    }
  }
}

module.exports = Sandwich