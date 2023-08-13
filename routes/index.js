const express = require('express')
const router = express.Router()
const generateShortURL = require('../utilities/generateShortURL')
const URL = require('../models/url')

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
    .then((data) => res.render('index', { origin: req.headers.origin, shortURL: data.shorten_url }))
    .catch(error => console.log(error))
})

router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router