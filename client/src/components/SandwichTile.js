import React from 'react'
import { Link } from 'react-router-dom'

const SandwichTile = (props) => {
  
  const sandwichInfo = (
    <div>
      <h5 className="bold">{props.sandwich.name}</h5>
      <p>{props.sandwich.restaurant}</p>
    </div>
  )
  return (
    <Link className="cell callout small-4 sandwich-tile" to={`/sandwiches/${props.sandwich.id}`}>
      {sandwichInfo}
    </Link>
  )
}

export default SandwichTile