/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("reviews", (table) => {
    table.bigIncrements("id")
    table.string("title")
    table.text("body").notNullable()
    table.integer("starRating").notNullable().unsigned()
    table
      .bigInteger("userId")
      .index()
      .unsigned()
      .notNullable()
      .references("users.id")
    table
      .bigInteger("sandwichId")
      .index()
      .unsigned()
      .notNullable()
      .references("sandwiches.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
		table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("reviews")
}
