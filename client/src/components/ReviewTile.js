import React from 'react'

const ReviewTile = (props) => {
  
  const shortDate = (props.review.createdAt).slice(0, 10)

  return (
    <div className="review-tile">
      <p>{props.review.username}</p>
      <p>{props.review.starRating} <span className="bold">{props.review.title}</span></p>
      <p>{shortDate}</p>
      <p className="review-body">{props.review.body}</p>
    </div>
  )
}

export default ReviewTile