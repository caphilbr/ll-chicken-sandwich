import React from 'react'

const ReviewTile = (props) => {

  return (
    <div className="callout">
      <p>{props.review.username} - {props.review.createdAt}</p>
      <p>{props.review.title}</p>
      <p>{props.review.body}</p>
      <p>{props.review.starRating}</p>
    </div>
  )
}

export default ReviewTile