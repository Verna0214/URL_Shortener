const mongoose = require('mongoose')
const URL_shortener = require('../url_shortener')
const generateCode = require('../../utilities/generateCode')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

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
    .catch(error => console.log('error!'))
})
