/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Sandwich } from "../models/index.js"

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
    
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder