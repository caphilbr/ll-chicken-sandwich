import React, { useState } from "react"
import _ from 'lodash'

const SandwichForm = (props) => {
  const [sandwich, setSandwich] = useState({
    name: "",
    restaurant: "",
    description: "",
    imageURL: ""
  })

  const onChangeHandler = event => {
    setSandwich({
      ...sandwich,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const clearForm = (event) => {
    event.preventDefault()
    setSandwich({
      name: "",
      restaurant: "",
      description: "",
      imageURL: ""
    })
    props.setErrors({})
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    props.addSandwich(sandwich) 
  }
  

  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
      <label htmlFor="name">Sandwich Name:
        <input 
          type="text" 
          name="name" 
          onChange={onChangeHandler} 
          value={sandwich.name}
        />
      </label>
      <label htmlFor="restaurant">Restaurant Name:
        <input 
          type="text" 
          name="restaurant"
          onChange={onChangeHandler} 
          value={sandwich.restaurant}
        />
      </label>
      <label htmlFor="description">Description:
        <textarea 
          name="description" 
          rows="4" 
          cols="50"
          onChange={onChangeHandler}
          value={sandwich.description}
        />
      </label>
      <label htmlFor="ImageURL">Image URL:
        <input 
          type="text" 
          name="imageURL"
          onChange={onChangeHandler} 
          value={sandwich.imageURL}
        />
      </label>
      <div className="grid-x grid-padding-x">
        <input className="cell small-2 button" type="submit" value="Create Sandwich"/>
        <p className="cell small-2 button clear-button" onClick={clearForm}>
          Clear
        </p>
      </div>
    </form>
  )
}

export default SandwichForm