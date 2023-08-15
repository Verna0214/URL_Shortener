const express = require('express')
const router = express.Router()
const generateShortURL = require('../utilities/generateShortURL')
const URL = require('../models/url')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

// users
router.use('/users', users)

// create
router.post('/', authenticator, (req, res) => {
  if (!req.body.url) return res.redirect('/')

  const shortURL = generateShortURL()

  return URL.findOne({ origin_url: req.body.url })
    .then((data) => {
      if (data) {
        return data;
      } else {
        return URL.create({ origin_url: req.body.url, shorten_url: shortURL, userId: req.user._id });
      }
    })
    .then((data) => res.render('shorturl', { origin: req.headers.origin, shortURL: data.shorten_url }))
    .catch(error => console.log(error))
})

// view history
router.get('/history', authenticator, (req, res) => {
  const userId = req.user._id
  return URL.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((urls) => res.render('history', { urls }))
    .catch(error => console.log(error))
})

// copy short url and redirect origin url
router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL

  return URL.findOne({ shorten_url: shortURL })
    .lean()
    .then((data) => {
      if (data && data.origin_url) {
        res.redirect(data.origin_url);
      } else {
        res.status(404).send('URL not found');
      }
    })
    .catch(error => console.log(error))
})

// index
router.get('/', authenticator, (req, res) => {
  res.render('index')
})


module.exports = router