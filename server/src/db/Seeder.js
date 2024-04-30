/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Sandwich, Review, User } from "../models/index.js"

class Seeder {
  static async seed() {
    await Sandwich.query().insert({
      name: "Chicken Slider", 
      restaurant: "Dave's Hot Chicken",
      description: "It's hot."
    });
    await Sandwich.query().insert({
      name: "Wendy's Spicy Chicken Sandwich", 
      restaurant: "Wendy's",
      description: "Very edible."
    });
    await Sandwich.query().insert({
      name: "KFC Chicken Sandwich", 
      restaurant: "Kentucky Fried Chicken",
      description: "Finger lickin' good"
    });
    await Sandwich.query().insert({
      name: "Mochiko Chix Sandwich", 
      restaurant: "Mochiko Hawaiian",
      description: "To die for."
    });

    await User.query().insert({
      email: "testUser@email.com",
      cryptedPassword: "password"
    })
    
    await Review.query().insert({
      title: "da bomb",
      body: "went down OK",
      starRating: 4,
      userId: 1,
      sandwichId: 2
    })
    await Review.query().insert({
      title: "meh",
      body: "is a'right",
      starRating: 2,
      userId: 1,
      sandwichId: 2
    })
    await Review.query().insert({
      title: "spicy",
      body: "don't order the spiciest blend",
      starRating: 3,
      userId: 1,
      sandwichId: 1
    })
    
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder