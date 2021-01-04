const getAllIndexes = <T>(array: T[], searchingValue: T): number[] => {
  const newArray = []
  let i = array.indexOf(searchingValue)

  while (i !== -1) {
    newArray.push(i)
    i = array.indexOf(searchingValue, i + 1)
  }

  return newArray
}

export default getAllIndexes
