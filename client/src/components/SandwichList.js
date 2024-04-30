import React, { useState, useEffect } from "react"
import SandwichTile from "./SandwichTile"
import SandwichForm from "./SandwichForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const SandwichList = (props) => {
  const [sandwiches, setSandwiches] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState({})

  const getSandwiches = async () => {
    try {
      const response = await fetch("/api/v1/sandwiches")
      const parsedData = await response.json()
      setSandwiches(parsedData.sandwiches)
    } catch(error) {
      console.log("Error in the fetch request")
      console.log(error)
    }
  }

  const addSandwich = async (newSandwich) => {
    try {
      const response = await fetch("/api/v1/sandwiches", {
        method: "POST",
        headers: new Headers ({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newSandwich)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json()
          const newErrors = translateServerErrors(errorBody.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
    } else {
      const responseBody = await response.json()
      setSandwiches([
        ...sandwiches,
        responseBody.newSandwich
      ])
    }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getSandwiches()
  }, [])

  const toggleFormOnClick = event => {
    setShowForm(true)
  }

  const formQuestion = 
    (
        <>
          <ErrorList errors={errors}/>
          <SandwichForm addSandwich={addSandwich} setErrors={setErrors}/>
        </>
    )
  
  let formElement  
  if (showForm) {
    formElement = formQuestion
  }

  const sandwichList = sandwiches.map(sandwich => {
    return <SandwichTile key={sandwich.id} sandwich={sandwich}/>
  })

  return (
    <>
      {sandwichList}
      <div>
        <p onClick={toggleFormOnClick}>Add Sandwich?</p>
        {formElement}
      </div>
    </>
  )
}

export default SandwichList