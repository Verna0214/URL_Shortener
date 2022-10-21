const db = require('../../config/mongoose')
const URL_shortener = require('../url_shortener')
const generateCode = require('../../utilities/generateCode')

db.once('open', () => {
  URL_shortener.create(
    {
      origin_url: 'https://www.google.com',
      shorten_url: `http://localhost:3000/${generateCode()}`
    },
    {
      origin_url: 'https://www.facebook.com',
      shorten_url: `http://localhost:3000/${generateCode()}`
    },
    {
      origin_url: 'https://developer.mozilla.org/en-US',
      shorten_url: `http://localhost:3000/${generateCode()}`
    },
  )
    .then(() => {
      console.log('done!')
    })
})
