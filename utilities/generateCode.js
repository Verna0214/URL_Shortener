function generateCode() {
  let shortenCode = ''
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '1234567890'
  const codeData = `${lowerCaseLetters}${upperCaseLetters}${number}`

  for (let i = 0; i < 5; i++) {
    shortenCode += codeData[Math.floor(Math.random () * codeData.length)]
  }

  return shortenCode
}

module.exports = generateCode

