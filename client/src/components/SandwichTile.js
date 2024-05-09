import React from 'react'
import { Link } from 'react-router-dom'
import ShowStarAverage from './ShowStarAverage'
import roundToHalf from './../services/roundToHalf.js'

const SandwichTile = (props) => {
  const fixedAverage = parseFloat(props.sandwich.averageRating).toFixed(2)

  let sandwichPic = <span className="no-sandwich-photo">No sandwich picture uploaded yet...</span>
  if (props.sandwich.imgUrl) {
    sandwichPic = <img className="sandwich-list-pic" src={props.sandwich.imgUrl}></img>
  }
  const sandwichInfo = (
    <div className="grid-x">
      <div className="cell small-4">
        {sandwichPic}
      </div>
      <div className="cell small-8">
        <h5 className="bold">{props.sandwich.name}</h5>
        <p>{props.sandwich.restaurant}</p>
        <ShowStarAverage roundedAverage={roundToHalf(props.sandwich.averageRating)} />
        <p>{fixedAverage}</p>
      </div>
    </div>
  )
  return (
    <Link className="cell callout small-6 medium-6 large-4 sandwich-tile" to={`/sandwiches/${props.sandwich.id}`}>
      {sandwichInfo}
    </Link>
  )
}

export default SandwichTile