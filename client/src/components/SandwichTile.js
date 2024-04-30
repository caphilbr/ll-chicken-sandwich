import React from 'react'

const SandwichTile = (props) => {

  return (
    <p>
      {props.sandwich.name} from {props.sandwich.restaurant}
    </p>
  )
}

export default SandwichTile