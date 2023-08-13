const URL = require('../url')
const db = require('../../config/mongoose')
const seeder = [
  { origin_url: 'https://www.google.com/', shorten_url: '6y7UP' },
  { origin_url: 'https://www.facebook.com/', shorten_url: 'jcmB3' },
  { origin_url: 'https://developer.mozilla.org/en-US/', shorten_url: 'Ecp3Y' }
]

db.once('open', () => {
  seeder.forEach((seed) => {
    return URL.create({ 
      origin_url: seed.origin_url,
      shorten_url: seed.shorten_url
    })
  })
  console.log('done!')
})
