import React, { useState } from 'react'
import translateServerErrors from './../services/translateServerErrors.js'
import ErrorList from './ErrorList.js'
import SelectStarRating from './SelectStarRating.js'

const EditReviewForm = (props) => {

  const [reviewFormFields, setReviewFormFields] = useState({
    title: props.review.title,
    body: props.review.body,
    starRating: props.review.starRating
  })
  const [errors, setErrors] = useState({})

  const editReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${props.review.id}`, {
        method: "PATCH",
        headers: new Headers ({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(reviewFormFields)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const parsedData = await response.json()
        const updatedReview = parsedData.review
        const updatedReviews = props.sandwich.reviews.map((review) => {
          if (review.id === props.review.id) {
            return updatedReview
          } else {
            return review
          }
        });
        props.setSandwich({
          ...parsedData.sandwich,
          reviews: updatedReviews,
        })
        props.setShowEdit(false)
      }
    } catch(error) {
      console.log("Error in the edit request: ", error.message);
    }
  }
  
  const submitForm = (event) => {
    event.preventDefault()
    editReview()
  }

  const handleInputChange = (event) => {
    setReviewFormFields({
      ...reviewFormFields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  return(
    <>
      <ErrorList errors={errors}/>
      <form onSubmit={submitForm}>
        <label> Star Rating:</label>
          <SelectStarRating
            reviewFormFields={reviewFormFields}
            setReviewFormFields={setReviewFormFields}
          />
        <label> Title:
          <input
            type='text'
            name='title'
            onChange={handleInputChange}
            value={reviewFormFields.title}
            />
        </label>
        <label> Body:
          <input
          type='text'
          name='body'
          onChange={handleInputChange}
          value={reviewFormFields.body}
          />
        </label>
        <input className="button small" type='submit' value='Submit' />
      </form>
    </>
  )
}

export default EditReviewForm