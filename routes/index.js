const express = require('express')
const router = express.Router()
const generateShortURL = require('../utilities/generateShortURL')
const URL = require('../models/url')

// create url
router.post('/', (req, res) => {
  if (!req.body.url) return res.redirect('/')

  const shortURL = generateShortURL()

  return URL.findOne({ origin_url: req.body.url })
    .then((data) => {
      if (data) {
        return data;
      } else {
        return URL.create({ origin_url: req.body.url, shorten_url: shortURL });
      }
    })
    .then((data) => res.render('shorturl', { origin: req.headers.origin, shortURL: data.shorten_url }))
    .catch(error => console.log(error))
})

// view history
router.get('/history', (req, res) => {
  return URL.find({})
    .lean()
    .then((urls) => res.render('history', { urls }))
    .catch(error => console.log(error))
})

// copy short url and redirect origin url
router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL

  return URL.findOne({ shorten_url: shortURL })
    .lean()
    .then((data) => res.redirect(data.origin_url))
    .catch(error => console.log(error))
})

// index
router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router