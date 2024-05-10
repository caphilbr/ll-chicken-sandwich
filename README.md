# Chicken Sandwich Review App
This webpage is designed to allow users to review different chicken sandwiches. Anyone can add a sandwich, but only logged in users can review them and vote on reviews.

## Authors:
 Charlie, Chris, Alex, Sean

## Steps to get working
1. Install necessary dependencies with 'yarn'
```sh
yarn install
```

2. Create the database
```sh
createdb ll-chicken-sandwich_development
```

3. Run the migrations and the seeder
```sh
cd server

yarn migrate:latest
yarn db:seed
```

4. For the app to run, you will need to populate a `.env` file with:

a) Needed for password encryption
```sh
SESSION_SECRET="your secret code"
```
b) Needed for uploading photos
```sh
AWS_ACCESS_KEY_ID=contact developers
AWS_SECRET_ACCESS_KEY=contact developers
S3_BUCKET_PRODUCTION=contact developers
S3_BUCKET_DEVELOPMENT=contact developers
```

5. Run the application on your local machine
```sh
cd ..
yarn run dev
```

6. Go to the link <http://localhost:3000> to view the webpage

## Webpage Features
* There is an always-present nav bar at the top of the page
* There is a sign in and sign up feature 
* When signed in you have access to a profile page and can upload a profile picture
* Home page has a list of currently-added chicken sandwiches
* Anyone can add a chicken sandwich
* Cliking on a chicken sandwich will show you the current reviews for the chicken sandwich
* Reviews have a star rating, title, and body
* Logged in users can make new reviews, edit and delete their own, and vote on other people's reviews

## Technologies implemented

* express.js
* Passport.js
* Knex.js/Objection.js database management
* Dropzone
* React.js
* React Router
* Foundation CSS styling
* Font Awesome icons