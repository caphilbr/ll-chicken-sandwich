import React, { useState, useEffect } from "react"
import SandwichTile from "./SandwichTile"
import SandwichForm from "./SandwichForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const SandwichList = (props) => {
  const [sandwiches, setSandwiches] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState({})
  const [showDropDown, setShowDropDown] = useState(false)

  const getSandwiches = async () => {
    try {
      const response = await fetch("/api/v1/sandwiches")
      const parsedData = await response.json()
      setSandwiches(parsedData.sandwiches)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
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
      setErrors({})
      setShowForm(false)
    }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getSandwiches()
  }, [])

  const toggleFormOnClick = event => {
    if (showForm) {
      setShowForm(false)
    } else {
      setShowForm(true)
    }
  }

  const formQuestion = (
    <>
      <ErrorList errors={errors}/>
      <SandwichForm addSandwich={addSandwich} errors={errors} setErrors={setErrors} />
    </>
  )

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const sortBy = (event) => {
    const value = event.currentTarget.getAttribute("value")
    if (value === "ratingHighest") {
      setSandwiches(sandwiches.toSorted((a,b) => {
        return b["averageRating"] - a["averageRating"]
      }))
    } else if (value === "ratingLowest") {
      setSandwiches(sandwiches.toSorted((a,b) => {
        return a["averageRating"] - b["averageRating"]
      }))
    } else {
      setSandwiches(sandwiches.toSorted((a,b) => {
        return a[value].localeCompare(b[value])
      }))
    }
  }

  let dropDownStyle = "dropdown-content-hidden"
  if (showDropDown) {
    dropDownStyle = "dropdown-content"
  }

  const sandwichList = sandwiches.map(sandwich => {
    return <SandwichTile key={sandwich.id} sandwich={sandwich}/>
  })

  return (
    <>
      <div className="title-container"><img className="cell small-6 title" src="https://fontmeme.com/permalink/240510/ca112d72921709a3c81ad78f4af00ca2.png" alt="fancy-fonts" border="0"/></div>
      <div className="grid-x list-page grid-padding-y">
        <div className="cell grid-x align-right grid-margin-x">
          <p className="button cell small-3 medium-3 large-2" onClick={toggleFormOnClick}>Add Sandwich</p>
          <div className="cell small-3 medium-3 large-2">
            <p onClick={toggleDropDown} className="sort button dropdown">Sort by</p>
            <div onMouseLeave={toggleDropDown} id="myDropdown" className={dropDownStyle}>
              <p className="drop-down-item" onClick={sortBy} value="ratingHighest">Rating (High to Low)</p>
              <p className="drop-down-item" onClick={sortBy} value="ratingLowest">Rating (Low to High)</p>
              <p className="drop-down-item" onClick={sortBy} value="restaurant">Restaurant Name</p>
              <p className="drop-down-item" onClick={sortBy} value="name">Sandwich Name</p>
  
            </div>  
          </div>
        </div>
        <div className="cell small-12 medium-8 large-6">
          {showForm ? formQuestion : null}
        </div>
        <div className="cell small-12 grid-x grid-margin-x">
          {sandwichList}
        </div>
      </div>
    </>
  )
}

export default SandwichList