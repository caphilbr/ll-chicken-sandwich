import React, { useState } from "react"

const ReviewVotes = props => {

  const [voteStatus, setVoteStatus] = useState(props.review.voteStatus)

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
      setVoteStatus(responseBody.voteStatus)
      if (responseBody.notAuthorized) {
        alert("Must be logged in to vote on reviews")
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  const onUpVote = event => {
    if (voteStatus === -1 || voteStatus === 0) {
      postVote(1)
    } else postVote(0)
  }

  const onDownVote = event => {
    if (voteStatus === 1 || voteStatus === 0) {
      postVote(-1)
    } else postVote(0)
  }

  let upVoteClass = "greyVote"
  let downVoteClass = "greyVote"

  if (voteStatus === 1) {
    upVoteClass = "greenVote"
  }

  if (voteStatus === -1) {
    downVoteClass = "redVote"
  }

  return (
    <div className="like-statuses">
      <p onClick={onUpVote} className={upVoteClass}>Up</p>
      <p onClick={onDownVote} className={downVoteClass}>down</p>
    </div>
  )
}

export default ReviewVotes