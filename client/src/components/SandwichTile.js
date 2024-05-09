import React from 'react'
import { Link } from 'react-router-dom'
import ShowStarAverage from './ShowStarAverage'
import roundToHalf from './../services/roundToHalf.js'

const SandwichTile = (props) => {
  const fixedAverage = parseFloat(props.sandwich.averageRating).toFixed(2)
  const sandwichInfo = (
    <div>
      <h5 className="bold">{props.sandwich.name}</h5>
      <p>{props.sandwich.restaurant}</p>
      <ShowStarAverage roundedAverage={roundToHalf(props.sandwich.averageRating)} />
      <p>{fixedAverage}</p>
    </div>
  )
  return (
    <Link className="cell callout small-4 sandwich-tile" to={`/sandwiches/${props.sandwich.id}`}>
      {sandwichInfo}
    </Link>
  )
}

export default SandwichTile