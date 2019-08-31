const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const lib = require('./server/library')

const client = './client/build'
app.use('/', express.static(client))
app.use('/login', express.static(client))
app.use('/signup', express.static(client))

app.post('/login', (req, res) => {
  const { userid, password } = req.body
  console.log(lib.time() + '/login', userid, password)
  return res.json({status: true})
})

app.post('/signup', (req, res) => {
  const { userid, password } = req.body
  console.log(lib.time() + '/signup', userid, password)
  return res.json({status: true})
})

app.listen(3000)