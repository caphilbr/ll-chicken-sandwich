import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowStarAverage = (props) => {

  const starIcons = [1,2,3,4,5].map(starNumber => {
    let starStyle = "fa-regular fa-star"
    if (props.roundedAverage >= starNumber) {
      starStyle = "fa-solid fa-star"
    }
    if (props.roundedAverage < starNumber && (props.roundedAverage + 0.5) === starNumber) {
      starStyle = "fa-solid fa-star-half-stroke"
    }
    return <FontAwesomeIcon key={starNumber} icon={starStyle} />
  })

  return (
    <>
     {starIcons}
    </>
  )
}

export default ShowStarAverage