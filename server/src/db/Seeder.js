/* eslint-disable no-console */
import { connection } from "../boot.js";
import { Sandwich, Review, User, Vote } from "../models/index.js"

class Seeder {
  static async seed() {
    
    await Sandwich.query().insert({
      name: "Chicken Slider", 
      restaurant: "Dave's Hot Chicken",
      description: "It's hot.",
      imgUrl: "https://media.timeout.com/images/105465391/image.jpg"
    });
    
    await Sandwich.query().insert({
      name: "Wendy's Spicy Chicken Sandwich", 
      restaurant: "Wendy's",
      description: "Very edible.",
      imgUrl: "https://media.cnn.com/api/v1/images/stellar/prod/201021184113-20201021-wendys-classic-chicken-sandwich.jpg?q=w_1110,c_fill"
    });
    
    await Sandwich.query().insert({
      name: "KFC Chicken Sandwich", 
      restaurant: "Kentucky Fried Chicken",
      description: "Finger lickin' good",
      imgUrl: "https://media.cnn.com/api/v1/images/stellar/prod/210104061626-kfc-new-chicken-sandwich.jpg?q=x_3,y_0,h_1684,w_2993,c_crop/w_800"
    });
    
    await Sandwich.query().insert({
      name: "Chix Sandwich", 
      restaurant: "Mochiko Hawaiian",
      description: "To die for.",
      imgUrl: "https://images.squarespace-cdn.com/content/v1/601436f64ae00f5d5298aaea/1626966850645-I1VRO8EV1MPC1MWCCUBU/image-asset.jpeg"
    });

    await User.query().insert({
      email: "testUser@email.com",
      username: "testUser",
      cryptedPassword: "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6",
      image: "https://tracywrightcorvo.com/wp-content/uploads/2018/01/cindy_ramirez-115r.jpg"
    })

    await User.query().insert({
      email: "tester@email.com",
      username: "tester",
      cryptedPassword: "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6",
      image: "https://images.squarespace-cdn.com/content/v1/5cfb0f8783523500013c5639/b29b7df0-d313-46aa-a7eb-16704edb2492/Professional-Headshot-Vancouver"
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

    await Review.query().insert({
      title: "it was decent",
      body: "pretty average",
      starRating: 3,
      userId: 2,
      sandwichId: 2
    })

    await Review.query().insert({
      title: "bleh",
      body: "hated it",
      starRating: 2,
      userId: 2,
      sandwichId: 2
    })

    await Vote.query().insert({
      userId: 1,
      reviewId: 1,
      voteStatus: 1
    })

    await Vote.query().insert({
      userId: 1,
      reviewId: 2,
      voteStatus: -1
    })

    await Vote.query().insert({
      userId: 2,
      reviewId: 1,
      voteStatus: 1
    })
    
    await Vote.query().insert({
      userId: 2,
      reviewId: 2,
      voteStatus: -1
    })
    
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder