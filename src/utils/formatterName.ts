export default (name?: string, surname?: string): string => {
  if (name) {
    const fullName = name.split(' ')
    const firstName = fullName[0]
    const secondName = fullName[1]

    if (secondName)
      return firstName.length <= 20
        ? `${firstName} ${secondName.substr(0, 1)}.`
        : `${firstName}...`

    if (surname)
      return firstName.length <= 20
        ? `${firstName} ${surname.substr(0, 1)}.`
        : `${firstName}...`

    return firstName.length <= 20 ? `${firstName} ` : `${firstName}...`
  }

  return ''
}
