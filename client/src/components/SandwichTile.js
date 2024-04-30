import React from 'react'
import { Link } from 'react-router-dom'

const SandwichTile = (props) => {
  return (
    <p>
      <Link to={`/sandwiches/${props.sandwich.id}`}>
        {props.sandwich.name} from {props.sandwich.restaurant}
      </Link>
    </p>
  )
}

export default SandwichTile