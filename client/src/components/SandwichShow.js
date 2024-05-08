import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewTile from "./ReviewTile";
import NewReviewForm from "./NewReviewForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SandwichShow = (props) => {
  const [sandwich, setSandwich] = useState({
    id: "",
    name: "",
    restaurant: "",
    imgUrl: "",
    description: "",
    reviews: [],
  });
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLogInMessage, setShowLogInMessage] = useState(false);

  const getSandwich = async () => {
    try {
      const response = await fetch(`/api/v1/sandwiches/${id}`);
      if (!response.ok) {
        const errorMessage = `Fetch error status ${response.status}: ${response.statusText}`;
        const newError = new Error(errorMessage);
        throw newError;
      } else {
        const parsedData = await response.json();
        setSandwich(parsedData.sandwich);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSandwich();
  }, []);

  const newReviewClick = () => {
    if (props.user) {
      if (showReviewForm) {
        setShowReviewForm(false);
      } else {
        setShowReviewForm(true);
      }
    } else {
      setShowReviewForm(false);
      setShowLogInMessage(true);
    }
  };

  const addReview = async (newReviewPayload) => {
    try {
      const response = await fetch(`/api/v1/sandwiches/${id}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewPayload),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const responseBody = await response.json();
        const newReview = responseBody.review;
        setSandwich({
          ...sandwich,
          reviews: [...sandwich.reviews, newReview],
        });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let showDescription = null;
  if (sandwich.description) {
    showDescription = <h4 className="cell small-6">Description: {sandwich.description}</h4>;
  }

  const reviewList = sandwich.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        user={props.user}
        sandwich={sandwich}
        setSandwich={setSandwich}
      />
    );
  });

  const roundHalf = (num) => {
    return Math.round(num*2)/2
  }

  let rounded = roundHalf(sandwich.averageRating)

  let roundedArray = []
  if ((rounded/1) >= 1) {
    roundedArray.push(1)
  } 
  if ((rounded/2) >= 1) {
    roundedArray.push(2)
  }
  if ((rounded/3) >= 1) {
    roundedArray.push(3)
  }
  if ((rounded/4) >= 1) {
    roundedArray.push(4)
  }
  if ((rounded/5) >= 1) {
    roundedArray.push(5)
  }
  if ((rounded%1) === .5) {
    roundedArray.push(.5)
  }

  const starIcons = roundedArray.map(starNumber => {
    let starStyle = "fa-regular fa-star"
    if (starNumber % 1 === 0) {
      starStyle = "fa-solid fa-star"
    }
    if (starNumber === .5) {
      starStyle = "fa-solid fa-star-half-stroke"
    }
    return <FontAwesomeIcon key={starNumber} icon={starStyle} />
  })

  for (let i = starIcons.length; i < 5; i++) {
    const emptyStar = <FontAwesomeIcon key={i+1} icon="fa-regular fa-star" />;
    starIcons.push(emptyStar)
  }

  return (
    <div className="show-page">
      <div className="grid-x grid-margin-x show-header">
        <h2 className="cell small-8">{sandwich.name}</h2>
        <span className="avg-rating">Average Rating: {starIcons}</span>
        <h4 className="cell small-6 border-right">Restaurant: {sandwich.restaurant}</h4>
        {showDescription}
      </div>
      <div className="form-container">
        <p className="button" onClick={newReviewClick}>
          Add Review
        </p>
        {showLogInMessage ? <p>You need to be logged in to leave a review</p> : null}
        {showReviewForm ? (
          <NewReviewForm setShowReviewForm={setShowReviewForm} addReview={addReview} />
        ) : null}
      </div>
      <h4 className="reviews-header">Reviews</h4>
      {reviewList}
    </div>
  );
};

export default SandwichShow;
