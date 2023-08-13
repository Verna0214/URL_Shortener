// require related modules
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// routers
app.get('/', (req, res) => {
  res.send('The server is running.')
})

// start server
app.listen(port, () =>{
  console.log(`The express is running on http://localhost:${port}`)
})