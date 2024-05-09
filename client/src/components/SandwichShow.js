import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewTile from "./ReviewTile";
import NewReviewForm from "./NewReviewForm";
import ShowStarAverage from "./ShowStarAverage";
import ErrorList from "./ErrorList";
import translateServerErrors from "../services/translateServerErrors";

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
  const [errors, setErrors] = useState({})

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
          ...responseBody.sandwich,
          reviews: [...sandwich.reviews, newReview],
        })
        setErrors({})
        setShowReviewForm(false)
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

  let roundedAverage = roundHalf(sandwich.averageRating)
  
  return (
    <div className="show-page">
      <div className="grid-x grid-margin-x show-header">
        <h2 className="cell small-8">{sandwich.name}</h2>
        <span className="avg-rating">Average Rating: <ShowStarAverage roundedAverage={roundedAverage}/></span>
        <h4 className="cell small-6 border-right">Restaurant: {sandwich.restaurant}</h4>
        {showDescription}
      </div>
      <div className="form-container">
        <p className="button" onClick={newReviewClick}>
          Add Review
        </p>
      <ErrorList errors={errors} />
        {showLogInMessage ? <p>You need to be logged in to leave a review</p> : null}
        {showReviewForm ? (
          <NewReviewForm setShowReviewForm={setShowReviewForm} addReview={addReview} setErrors={setErrors}/>
        ) : null}
      </div>
      <h4 className="reviews-header">Reviews</h4>
      {reviewList}
    </div>
  );
};

export default SandwichShow;
