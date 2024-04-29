import React, { useState, useEffect } from "react"

const SandwichList = (props) => {
  const [sandwiches, setSandwiches] = useState([])

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
  
  useEffect(() => {
    getSandwiches()
  }, [])

  const sandwichList = sandwiches.map(sandwich => {
    return (
      <li key={sandwich.id}>
        {sandwich.name} from {sandwich.restaurant}
      </li>
    )
  })

  return (
    <>
      <ul>
        {sandwichList}
      </ul>
    </>
  )
}

export default SandwichList