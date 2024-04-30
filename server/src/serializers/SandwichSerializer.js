class SandwichSerializer {
  static summaryForIndex = (sandwiches) => {
    const allowedFields = ["id", "name", "restaurant"]
    const serializedSandwiches = sandwiches.map(sandwich => {
      const serializedSandwich = {}
      allowedFields.forEach(field => {
        serializedSandwich[field] = sandwich[field]
      })
      return serializedSandwich
    })
    return serializedSandwiches 
  }
  
  static summaryForShow = (sandwich) => {
    const allowedFields = ["id", "name", "description", "imgUrl", "restaurant"]
    const serializedSandwich = {}
    allowedFields.forEach(field => {
      serializedSandwich[field] = sandwich[field]
    })
    return serializedSandwich
  }
}

export default SandwichSerializer