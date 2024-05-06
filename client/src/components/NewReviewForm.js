import React, { useState, useEffect } from 'react'

const NewReviewForm = (props) => {

  const [reviewFormFields, setReviewFormFields] = useState({
    id: "",
    title: "",
    body: "",
    starRating: ""
  })

  const submitForm = (event) => {
    event.preventDefault()
    props.addReview(reviewFormFields)
    setReviewFormFields({
      title: "",
      body: "",
      starRating: ""
    })
    props.setShowReviewForm(false)
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
        <label> Title:
          <input type='text' name='title' onChange={handleInputChange} value={reviewFormFields.title} />
        </label>
        <label> Body:
          <input type='text' name='body' onChange={handleInputChange} value={reviewFormFields.body} />
        </label>
        <label> Star Rating:
          <input type='text' name='starRating' onChange={handleInputChange} value={reviewFormFields.starRating} />
        </label>
        <input className="button" type='submit' value='Submit' />
      </form>
    </>
  )
}

export default NewReviewForm