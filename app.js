const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes') // 路由重構後載入
require('./config/mongoose') // mongoose重構後載入

const mainUrl = 'http://localhost:'
const port = 3000
const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on ${mainUrl}${port}`)
})