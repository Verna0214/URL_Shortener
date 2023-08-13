function generateShortURL () {
  const numbers = '1234567890'.split('')
  const lowerWords = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const upperWords = lowerWords.map(word => word.toUpperCase())
  const allElements = numbers.concat(lowerWords, upperWords)
  let shortURL = ''

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * allElements.length)

    shortURL += allElements[randomIndex]
  }

  return shortURL

} 

generateShortURL()

module.exports = generateShortURL