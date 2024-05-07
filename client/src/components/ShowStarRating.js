import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowStarRating = (props) => {

  const starIcons = [1,2,3,4,5].map(starNumber => {
    if (props.rating >= starNumber) {
      return <FontAwesomeIcon key={starNumber} icon="fa-solid fa-star" />
    } else {
      return <FontAwesomeIcon key={starNumber} icon="fa-regular fa-star" />
    }
  })

  return (
    <>
     {starIcons}
    </>
  )
}

export default ShowStarRating