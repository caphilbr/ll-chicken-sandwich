// include all of your models here using CommonJS requires
const User = require("./User.js");
const Sandwich = require("./Sandwich.js")
const Review = require("./Review.js")
const Vote = require("./Vote.js")

module.exports = { User, Sandwich, Review, Vote };
