import React, { useState } from "react"

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

  let upVoteClass = "grey-vote"
  let downVoteClass = "grey-vote"

  if (currentVoteStatus === 1) {
    upVoteClass = "green-vote"
  }

  if (currentVoteStatus === -1) {
    downVoteClass = "red-vote"
  }

  let signinMessage
  if (showSignInMessage) {
    signinMessage = <p>You must be signed in to vote</p>
  }

  return (
    <div className="like-statuses">
      {signinMessage}
      <p>
        <span onClick={onUpVote} className={upVoteClass}>Up : {voteCount.upVotes}</span>
        <span onClick={onDownVote} className={downVoteClass}> | Down : {voteCount.downVotes}</span>
      </p>
    </div>
  )
}

export default ReviewVotes