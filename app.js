const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const URL_shortener = require('./models/url_shortener')
const generateCode = require('./utilities/generateCode')

const mainUrl = 'http://localhost:'
const port = 3000

const app = express()
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:shorten', (req, res) => {
  const shortenCode = req.params.shorten
  URL_shortener.find({})
    .lean()
    .then((urlList) => {
      url = urlList.find((eachUrl) => eachUrl.shorten_url === `${mainUrl}${port}/${shortenCode}`)
      if (url) {
        console.log(url)
        return res.redirect(url.origin_url)
      }
    })
    .catch(error => console.log(error))
})

app.post('/', (req, res) => {
  const newUrl = req.body.url
  let urlShorten = ''
  URL_shortener.find()
    .lean()
    .then((urlList) => {
      urlShorten = urlList.find((eachUrl) => eachUrl.origin_url === newUrl)
      if (urlShorten) {
        urlShorten = urlShorten.shorten_url
        return res.render('show', { urlShorten })
      }

      urlShorten = `${mainUrl}${port}/${generateCode()}`
      while (urlList.some((eachUrl) => eachUrl.shorten_url === urlShorten)) {
        urlShorten = `${mainUrl}${port}/${generateCode()}`
      }

      return URL_shortener.create({
        origin_url: newUrl,
        shorten_url: urlShorten
      })
    })
    .then(() => res.render('show', { urlShorten }))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log(`App is running on ${mainUrl}${port}`)
})