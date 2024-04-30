const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["body", "starRating", "userId", "sandwichId"],
      properties: {
        title: { type: "string", minLength: 2, maxLength: 100 },
        body: { type: "string", minLength: 2, maxLength: 1000 },
        starRating: { type: "integer", minimum: 1, maximum: 5 },
        userId: { type: "integer" },
        sandwichId: { type: "integer" }
      }
    }
  }

  static get relationMappings() {
    const { User, Sandwich } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      },
      sandwich: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sandwich,
        join: {
          from: "reviews.sandwichId",
          to: "sandwiches.id"
        }
      }
    }
  }
}

module.exports = Review