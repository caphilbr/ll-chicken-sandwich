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

    await Sandwich.query().insert({
      name: "Bacon and Swiss Royal Crispy Chicken", 
      restaurant: "Burger King",
      description: "Fit for a king",
      imgUrl: "https://assets-global.website-files.com/631b4b4e277091ef01450237/659476dd31f6c84951297b4d_Classic%20RCC.png"
    });

    await Sandwich.query().insert({
      name: "Chick-fil-A Deluxe Chicken Sandwich", 
      restaurant: "Chick-fil-A",
      description: "Only the best",
      imgUrl: "https://www.cfacdn.com/img/order/menu/Mobile/Entrees/Parent/cfaDeluxe_mobile.png"
    });

    await Sandwich.query().insert({
      name: "Golden BBQ Chicken Sandwich", 
      restaurant: "Popeyes",
      description: "A juicy chicken breast fillet marinated in Popeyes seasonings, hand battered and breaded in our buttermilk system",
      imgUrl: "https://cdn.sanity.io/images/czqk28jt/prod_plk_us/5ae44ac528e614fe490dae11b9e52373e3ccea96-2000x1333.png?w=336&q=100&fit=max&auto=format"
    });

    await Sandwich.query().insert({
      name: "Ranch Fried Chicken Sandwich", 
      restaurant: "Shy Bird",
      description: "Fancy Chicken Sandwich",
      imgUrl: "https://www.thefoodlens.com/uploads/2020/11/SHY-BIRD_FRIED-CHICKEN-SANDWICH-AND-SB-DUNKS-AND-CHICKEN-RICE-SOUP_THE-FOOD-LENS_BRIAN-SAMUELS-PHOTOGRAPHY_NOVEMBER-2020-0217-1200x800.jpg"
    });

    await Sandwich.query().insert({
      name: "Nashville Hot Chicken Sandwich", 
      restaurant: "Hot Chix",
      description: "Spicy good",
      imgUrl: "https://bdc2020.o0bc.com/wp-content/uploads/2021/06/Nashville-Hot-Chicken-from-Hot-Chix-hero-60be2a003ab0e-768x432.jpg?width=800"
    });

    await Sandwich.query().insert({
      name: "Fried Chicken Sandwich", 
      restaurant: "Hemlock Grill",
      description: "Golf Course Restaurant",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8GXj9XYA0l3wKRhSvTm-8Hw7QRQk35ACrxEV8pKeHKzgxB3lyshROtHE2gL9PFkez4MA&usqp=CAU"
    });

    await Sandwich.query().insert({
      name: "The Sandwich Combo", 
      restaurant: "Raising Cane's",
      description: "3 Chicken Fingers, Cane's Sauce, Lettuce, Toasted Bun, Crinkle-Cut Fries, Regular Fountain Drink/Tea",
      imgUrl: "https://olo-images-live.imgix.net/63/6360657c5913431a89b57b392ebac304.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1800&h=1200&fit=fill&fm=png32&bg=transparent&s=dbcd8b67a6182cf429829bd63ae746a7"
    });

    await Sandwich.query().insert({
      name: "Chicken Shack", 
      restaurant: "Shake Shack",
      description: "Crispy, white-meat chicken breast over lettuce, pickles, and buttermilk herb mayo on a toasted potato bun",
      imgUrl: "https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Chicken_ChickenShack_1500x920_lg1663591157.jpeg"
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

    await User.query().insert({
      email: "crashtest@email.com",
      username: "crashtestdummy",
      cryptedPassword: "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6",
      image: "https://www.morphsuits.com/media/catalog/product/8/1/816804014989.main.jpg?width=810&height=810&store=morphsuitsus_storeview&image-type=image"
    })

    await User.query().insert({
      email: "harrySpotter@email.com",
      username: "Harry Spotter",
      cryptedPassword: "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6",
      image: "https://cdnb.artstation.com/p/assets/images/images/063/560/871/large/whatifitsdifferent-evk-ericvk-daniel-radcliffe-glasses-as-front-lat-expansion-giant-19c94855-d5fd-4311-9105-3824920e460e.jpg?1685816059"
    })

    await User.query().insert({
      email: "spooderman@email.com",
      username: "xX_spooderman123_Xx",
      cryptedPassword: "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6",
      image: "https://mystickermania.com/cdn/stickers/memes/sticker_2114-512x512.png"
    })

    await User.query().insert({
      email: "random@email.com",
      username: "superfluous_jam",
      cryptedPassword: "$2b$10$0QWLysuv4WG15tVgNyOEeu9zRt2eKv3RAfja0KCRho7HGt17N/tm6",
      image: "https://a.pinatafarm.com/540x405/b7e7f8dd64/pepe-silvia.jpg"
    })

    //1
    await Review.query().insert({
      title: "spicy",
      body: "don't order the spiciest blend",
      starRating: 3,
      userId: 1,
      sandwichId: 1
    })

    //2
    await Review.query().insert({
      title: "delicious",
      body: "loved it",
      starRating: 4,
      userId: 2,
      sandwichId: 1 
    })

    //3
    await Review.query().insert({
      title: "too spicy",
      body: "burned my mouth",
      starRating: 1,
      userId: 5,
      sandwichId: 1 
    })

    //4
    await Review.query().insert({
      title: "da bomb",
      body: "went down OK",
      starRating: 4,
      userId: 3,
      sandwichId: 2
    })
    
    //5
    await Review.query().insert({
      title: "it was decent",
      body: "pretty average",
      starRating: 3,
      userId: 2,
      sandwichId: 2
    })

    //6
    await Review.query().insert({
      title: "meh",
      body: "meh",
      starRating: 2,
      userId: 1,
      sandwichId: 3
    })

    //7
    await Review.query().insert({
      title: "classic goodness",
      body: "it's the classic experience",
      starRating: 4,
      userId: 6,
      sandwichId: 3
    })

    //8
    await Review.query().insert({
      title: "Great!",
      body: "It's finger lickin' good",
      starRating: 5,
      userId: 2,
      sandwichId: 3
    })

    //9
    await Review.query().insert({
      title: "Not enough protein",
      body: "Too little chicken. I need more protein to be able to outlift Voldemort. I need to add 50 pounds to my bench press by the end of the week.",
      starRating: 2,
      userId: 4,
      sandwichId: 3
    })

    //10
    await Review.query().insert({
      title: "average",
      body: "just another chicken sandwich. I mean what can I say. It's a chicken sandwich, nothing special about it",
      starRating: 3,
      userId: 5,
      sandwichId: 3
    })

    //11
    await Review.query().insert({
      title: "tasted great",
      body: "the usual good quality",
      starRating: 4,
      userId: 1,
      sandwichId: 3
    })

    //12
    await Review.query().insert({
      title: "never heard of it before, but it's great",
      body: "didn't know this place existed until a friend recommended it to me. now I come here almost everyday",
      starRating: 5,
      userId: 3,
      sandwichId: 4
    })

    //13
    await Review.query().insert({
      title: "underrated place",
      body: "really good food. how did I not know about this place sooner?",
      starRating: 4,
      userId: 1,
      sandwichId: 4
    })

    //14
    await Review.query().insert({
      title: "Burger King Sux",
      body: "L + ratio Burger King fell off",
      starRating: 1,
      userId: 5,
      sandwichId: 5
    })

    //15
    await Review.query().insert({
      title: "Not bad",
      body: "I've had better and worse before",
      starRating: 2,
      userId: 6,
      sandwichId: 5
    })

    //16
    await Review.query().insert({
      title: "Amazing",
      body: "this is my favorite chicken sandwich ever",
      starRating: 4,
      userId: 2,
      sandwichId: 5
    })

    //17
    await Review.query().insert({
      title: "Terrible",
      body: "Got treated poorly by the register and my chicken was not fully cooked",
      starRating: 1,
      userId: 1,
      sandwichId: 6
    })

    //18
    await Review.query().insert({
      title: "Pretty good",
      body: "I mean, it's aight",
      starRating: 3,
      userId: 6,
      sandwichId: 6
    })

    //19
    await Review.query().insert({
      title: "Decent",
      body: "Could be a little bigger but it's okay if I get 2 of these to build muscle. Ron's been catching up to me so I need to get more serious.",
      starRating: 3,
      userId: 4,
      sandwichId: 6
    })
    
    //20
    await Review.query().insert({
      title: "I'm lovin it",
      body: "So much better than a McChicken",
      starRating: 4,
      userId: 2,
      sandwichId: 6
    })

    for(let user = 1; user <=6; user++){
      for(let review = 1; review <=20; review++){
        const random = Math.random()
        let vote
        if (random<0.4){
          vote = -1
        } else if (random<0.8){
          vote = 1
        } else {
          vote = 0
        }
        await Vote.query().insert({
          userId: user,
          reviewId: review,
          voteStatus: vote
        })
      }
    }
    
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder