import React from 'react'
import ReviewVotes from './ReviewVotes'

const ReviewTile = (props) => {
  const shortDate = (props.review.createdAt).slice(0, 10)

  const deleteReview = async () => {
    try {
      const response = await fetch(
        `/api/v1/reviews/${props.review.id}`,
        { method: "DELETE" }
      )
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

  let deleteButton = null
  if (props.user && props.review.userId == props.user.id) {
    deleteButton = (
      <p className="cell small-2 alert button" onClick={deleteClick}>
        Delete Review
      </p>
    )
  }

  return (
    <div className="review-tile">
      <div className="grid-x">
        <p className="cell small-10">{props.review.username}</p>
        {deleteButton}
      </div>
      <p>{props.review.starRating} <span className="bold">{props.review.title}</span></p>
      <p>{shortDate}</p>
      <p className="review-body">{props.review.body}</p>
      <ReviewVotes
        review={props.review}
        sandwich={props.sandwich}
        setSandwich={props.setSandwich}
      />
    </div>
  )
}

export default ReviewTile