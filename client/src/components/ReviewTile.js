import React from 'react'
import ReviewVotes from './ReviewVotes'

const ReviewTile = (props) => {

  return (
    <div className="callout">
      <p>{props.review.userId} - {props.review.createdAt}</p>
      <p>{props.review.title}</p>
      <p>{props.review.body}</p>
      <p>{props.review.starRating}</p>
      <ReviewVotes review={props.review} />
    </div>
  )
}

export default ReviewTile