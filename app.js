// require related modules
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000
require('./config/mongoose')

// set hbs engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// routers
app.get('/', (req, res) => {
  res.render('index')
})

// start server
app.listen(port, () =>{
  console.log(`The express is running on http://localhost:${port}`)
})