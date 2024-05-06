import React, { useState } from 'react'

const EditReviewForm = (props) => {

  const [reviewFormFields, setReviewFormFields] = useState({
    id: props.review.id,
    title: props.review.title,
    body: props.review.body,
    starRating: props.review.starRating
  })

  //  we only need to pre-populate title, body, starRating
  // when persisting, need to also send review id
  // it's not a POST fetch, but a PATCH
  // somehow also update the review on the screen with the returned edited review

  const editReview = () => {
    const response = fetch()
    // create fetch request
  }
  
  const submitForm = (event) => {
    event.preventDefault()
    editReview()
    setReviewFormFields({
      title: "",
      body: "",
      starRating: ""
    })
  }

  const handleInputChange = (event) => {
    setReviewFormFields({
      ...reviewFormFields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  return(
    <>
      <form onSubmit={submitForm}>
        <label> Star Rating:
          <input type='text' name='starRating' onChange={handleInputChange} value={reviewFormFields.starRating} />
        </label>
        <label> Title:
          <input type='text' name='title' onChange={handleInputChange} value={reviewFormFields.title} />
        </label>
        <label> Body:
          <input type='text' name='body' onChange={handleInputChange} value={reviewFormFields.body} />
        </label>
        <input className="button small" type='submit' value='Submit' />
      </form>
    </>
  )
}

export default EditReviewForm