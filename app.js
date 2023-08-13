// require related modules
const express = require('express')
const exphbs = require('express-handlebars')

const router = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000


// set hbs engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
// use body-parser
app.use(express.urlencoded({ extended: true }))

// routers
app.use(router)

// start server
app.listen(port, () =>{
  console.log(`The express is running on http://localhost:${port}`)
})