const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const URL = require('../url')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_URL = [
  { origin_url: 'https://www.google.com/', shorten_url: '6y7UP' },
  { origin_url: 'https://www.facebook.com/', shorten_url: 'jcmB3' },
  { origin_url: 'https://developer.mozilla.org/en-US/', shorten_url: 'Ecp3Y' }
]
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then((user) => {
      const userId = user._id
      const urlPromises = SEED_URL.map((url) => {
        return URL.create({
          origin_url: url.origin_url,
          shorten_url: url.shorten_url,
          userId
        })
      })
      return Promise.all(urlPromises)
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(error => console.log(error))
})