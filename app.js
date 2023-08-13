// require related modules
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')

const router = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000


// set hbs engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// set session
app.use(session({
  secret: 'SecretKey',
  resave: false,
  saveUninitialized: true
}))

// use body-parser
app.use(express.urlencoded({ extended: true }))

// passport
usePassport(app)

// routers
app.use(router)

// start server
app.listen(port, () =>{
  console.log(`The express is running on http://localhost:${port}`)
})