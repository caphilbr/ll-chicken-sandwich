/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	return knex.schema.createTable("sandwiches", (table) => {
		table.bigIncrements("id")
		table.string("name").notNullable().unique()
		table.string("imgUrl")
		table.string("restaurant").notNullable()
		table.string("description")
		table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
		table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
	})
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
	return knex.schema.dropTableIfExists("sandwiches")
};
