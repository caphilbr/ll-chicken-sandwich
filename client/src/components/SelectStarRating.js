import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectStarRating = (props) => {

  const selectStar = (event) => {
    const ratingSelected = event.currentTarget.getAttribute('name')
    props.setReviewFormFields({
      ...props.reviewFormFields,
      starRating: ratingSelected
    })
  }

  const starIcons = [1,2,3,4,5].map(starNumber => {
    let starStyle = "fa-regular fa-star"
    if (props.reviewFormFields.starRating >= starNumber) {
      starStyle = "fa-solid fa-star"
    }
    return (
      <FontAwesomeIcon
        key={starNumber}
        name={starNumber}
        onClick={selectStar}
        icon={starStyle}
      />  
    )
  })

  return (
    <>
     {starIcons}
    </>
  )
}

export default SelectStarRating