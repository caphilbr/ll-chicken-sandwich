import React, { useState, useEffect } from 'react'

const SandwichShow = (props) => {
  const [sandwich, setSandwich] = useState({})

  const getSandwich = async () => {
    try {
      const id = props.match.params.id
      const response = await fetch(`/api/v1/sandwiches/${id}`)
      if(!response.ok) {
        const errorMessage =
          `Fetch error status ${response.status}: ${response.statusText}`
        const newError = new Error(errorMessage)
        throw(newError)
      } else {
        const parsedData = await response.json()
        setSandwich(parsedData.sandwich)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getSandwich()
  }, [])


  return (
    <h2>{sandwich.name}</h2>
  )
}

export default SandwichShow