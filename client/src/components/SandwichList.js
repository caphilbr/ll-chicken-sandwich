import React, { useState, useEffect } from "react"
import SandwichTile from "./SandwichTile"

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
    return <SandwichTile key={sandwich.id} sandwich={sandwich} />
  })

  return (
    <>
      {sandwichList}
    </>
  )
}

export default SandwichList