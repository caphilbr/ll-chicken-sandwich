import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ReviewVotes = props => {

  const currentVoteStatus = props.review.voteStatus
  const [voteCount, setVoteCount] = useState(props.review.votes)
  const [showSignInMessage, setShowSignInMessage] = useState(false)

  const postVote = async (newStatus) => {
    try {
      const response = await fetch("/api/v1/votes", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({
          reviewId: props.review.id,
          voteStatus: newStatus
        })
      })
      const responseBody = await response.json()
      if (response.status === 401) {
        setShowSignInMessage(true)
      } else {
        const allReviews = props.sandwich.reviews
        allReviews.forEach(review => {
          if (review.id === props.review.id) {
            review.voteStatus = newStatus
          } 
        })
        props.setSandwich({
          ...props.sandwich,
          reviews: allReviews
        })
        setVoteCount(responseBody.voteCount)
      }
    } catch (error) {
      console.log("Error in post request: ", error.message)
    }
  }

  const onUpVote = event => {
    if (currentVoteStatus === -1 || currentVoteStatus === 0) {
      postVote(1)
    } else {
      postVote(0)
    }
  }

  const onDownVote = event => {
    if (currentVoteStatus === 1 || currentVoteStatus === 0) {
      postVote(-1)
    } else {
      postVote(0)
    }
  }

  let thumbsUpClass = "fa-regular fa-thumbs-up"
  let upColor = "grey"
  let thumbsDownClass = "fa-regular fa-thumbs-down"
  let downColor = "grey"

  if (currentVoteStatus === 1) {
    thumbsUpClass = "fa-solid fa-thumbs-up"
    upColor = "green"
  }

  if (currentVoteStatus === -1) {
    thumbsDownClass = "fa-solid fa-thumbs-down"
    downColor = "red"
  }

  let signinMessage
  if (showSignInMessage) {
    signinMessage = <p>You must be signed in to vote</p>
  }
  
  return (
    <div className="like-statuses">
      {signinMessage}
      <p>
        <FontAwesomeIcon icon={thumbsUpClass} onClick={onUpVote} color={upColor} />
        <span > {voteCount.upVotes} | {voteCount.downVotes} </span>
        <FontAwesomeIcon icon={thumbsDownClass} onClick={onDownVote} color={downColor}/>
      </p>
    </div>
  )
}

export default ReviewVotes