import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewTile from "./ReviewTile";
import NewReviewForm from "./NewReviewForm";
import ShowStarAverage from "./ShowStarAverage";
import ErrorList from "./ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import roundHalf from "../services/roundToHalf";

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
    showDescription = <h4 className="cell small-6"><span className="bold">Description: </span>{sandwich.description}</h4>;
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

  const roundedAverage = roundHalf(sandwich.averageRating)
  const average = parseFloat(sandwich.averageRating)
  const fixedAverage = average.toFixed(2)

  let sandwichPic = <span className="no-sandwich-photo">No sandwich picture uploaded yet...</span>
  if (sandwich.imgUrl) {
    sandwichPic = <img className="small-8 medium-9 large-11 sandwich-show-pic" src={sandwich.imgUrl}></img>
  }
  return (
    <div className="show-page">
      <div className="grid-x grid-margin-x show-header grid-margin-y">
        <div className="cell small-2 grid-x">
          {sandwichPic}
        </div>
        <h2 className="cell small-6 bold">{sandwich.name}</h2>
        <div className="cell small-4 grid-x">
          <span className="cell medium-12 large-6">Average Rating: </span>
          <span className="cell medium-12 large-6"><ShowStarAverage roundedAverage={roundedAverage}/>{fixedAverage}</span>
        </div>
        <h4 className="cell small-6 border-right"><span className="bold">Restaurant: </span>{sandwich.restaurant}</h4>
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
