import React, { useState } from 'react'
import ReviewVotes from './ReviewVotes'
import EditReviewForm from './EditReviewForm'

const ReviewTile = (props) => {
  const [showEdit, setShowEdit] = useState(false)
  
  const shortDate = (
    <p className="date">
      {(props.review.createdAt).slice(0, 10)}
    </p>
  )

  const deleteReview = async () => {
    try {
      const response = await fetch(`/api/v1/sandwiches/${props.review.sandwichId}/reviews`, {
        method: "DELETE",
        headers: new Headers ({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ reviewId: props.review.id })
      })
      if (response.ok) {
        const remainingReviews = props.sandwich.reviews.filter(review => {
          return review.id != props.review.id
        })
        props.setSandwich({
          ...props.sandwich,
          reviews: remainingReviews
        })
      }
    } catch(error) {
      console.log("Error in the delete request: ", error.message)
    }
  }

  const deleteClick = () => {
    deleteReview()
  }

  const editClick = () => {
    setShowEdit(!showEdit)
  }
  
  let deleteButton = (
    <p className="cell alert button small" onClick={deleteClick}>
      Delete Review
    </p>
  )

  let reviewButtonMessage
  if (showEdit) {
    reviewButtonMessage = "Cancel Edit"
    deleteButton = null
  } else {
    reviewButtonMessage = "Edit Review"
  }

  let deleteEditButtons = null
  if (props.user && props.review.userId == props.user.id) {
    deleteEditButtons = (
      <>
        {deleteButton}
        <p className="cell button small" onClick={editClick}>
          {reviewButtonMessage}
        </p>      
      </>
    )
  }

  const reviewContent = (
    <>
      <p>{props.review.starRating} <span className="bold">{props.review.title}</span></p>
      <p>{shortDate}</p>
      <p className="review-body">{props.review.body}</p>
    </>
  )

  return (
    <div className="review-tile">
      <p>{props.review.username}</p>
      <div className="review-main-section">
        {showEdit ? <EditReviewForm review={props.review} /> : reviewContent}
        <ReviewVotes
          review={props.review}
          sandwich={props.sandwich}
          setSandwich={props.setSandwich}
        />
      </div>
      <div className="grid-margin-x review-bottom-bar">
        {deleteEditButtons}
      </div>
    </div>
  )
}

export default ReviewTile