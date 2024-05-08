import React, { useState } from "react";
import ReviewVotes from "./ReviewVotes";
import EditReviewForm from "./EditReviewForm";
import ShowStarRating from "./ShowStarRating";

const ReviewTile = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const shortDate = <p className="date">{props.review.createdAt.slice(0, 10)}</p>;

  const deleteReview = async () => {
    try {
      const response = await fetch(
        `/api/v1/reviews/${props.review.id}`,
        { method: "DELETE" }
      )
      if (response.ok) {
        const remainingReviews = props.sandwich.reviews.filter((review) => {
          return review.id != props.review.id;
        });
        props.setSandwich({
          ...props.sandwich,
          reviews: remainingReviews,
        });
      }
    } catch (error) {
      console.log("Error in the delete request: ", error.message);
    }
  };

  const deleteClick = () => {
    deleteReview();
  };

  const editClick = () => {
    setShowEdit(!showEdit);
  };

  let deleteButton = (
    <p className="cell alert button small" onClick={deleteClick}>
      Delete Review
    </p>
  );

  let reviewButtonMessage = "Edit Review";
  if (showEdit) {
    reviewButtonMessage = "Cancel Edit";
    deleteButton = null;
  }

  let editButton = (
    <p className="cell button small" onClick={editClick}>
      {reviewButtonMessage}
    </p>
  );

  let deleteEditButtons = null;
  if (props.user && props.review.userId == props.user.id) {
    deleteEditButtons = (
      <>
        {deleteButton}
        {editButton}
      </>
    );
  }

  const reviewContent = (
    <>
      <p>
        <ShowStarRating rating={props.review.starRating} />
        <span className="bold"> {props.review.title}</span>
      </p>
      {shortDate}
      <p className="review-body">{props.review.body}</p>
    </>
  );

  return (
    <div className="review-tile">
      <p>{props.review.username}</p>
      <div className="review-main-section">
        {showEdit ? (
          <EditReviewForm
            sandwich={props.sandwich}
            setSandwich={props.setSandwich}
            review={props.review}
            setShowEdit={setShowEdit}
          />
        ) : (
          reviewContent
        )}
        <ReviewVotes
          review={props.review}
          sandwich={props.sandwich}
          setSandwich={props.setSandwich}
        />
      </div>
      <div className="grid-margin-x review-bottom-bar">{deleteEditButtons}</div>
    </div>
  );
};

export default ReviewTile;