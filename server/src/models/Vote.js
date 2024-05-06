const Model = require("./Model.js")

class Vote extends Model {

  static get tableName() {
    return "votes"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "reviewId", "voteStatus"],
      properties: {
        userId: { type: "integer" },
        reviewId: { type: "integer" },
        voteStatus: { type: "integer", minimum: -1, maximum: 1}
      }
    }
  }

  static get relationMappings() {
    const { User, Review } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id"
        }
      },
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: "votes.reviewId",
          to: "reviews.id"
        }
      }
    }
  }
}

module.exports = Vote