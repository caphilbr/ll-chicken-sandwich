import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowStarRating = (props) => {

  const starIcons = [1,2,3,4,5].map(starNumber => {
    let starStyle = "fa-regular fa-star"
    if (props.rating >= starNumber) {
      starStyle = "fa-solid fa-star"
    }
    return <FontAwesomeIcon key={starNumber} icon={starStyle} />
  })

  return (
    <>
     {starIcons}
    </>
  )
}

export default ShowStarRating