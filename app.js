const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const client = './client/build'
app.use('/', express.static(client))
app.use('/login', express.static(client))
app.use('/signup', express.static(client))

app.post('/login', (req, res) => {
  const { userid, password } = req.body
  console.log('/login', userid, password)
  return res.json({status: true})
})

app.listen(3000)