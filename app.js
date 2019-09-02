const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const client = './client/build'
app.use('/', express.static(client))
app.use('/login', express.static(client))
app.use('/signup', express.static(client))
app.use('/home', express.static(client))

const lib = require('./server/library')
const libUser = require('./server/user')

app.post('/signup', (req, res) => {
  const { userid, password, clientid, userAgent, version } = req.body
  console.log(lib.time() + '/signup', userid, version)
  if (!userid) return res.json({err: {type: 'blankUserid'}})
  if (!password) return res.json({err: {type: 'blankPassword'}})
  libUser.addUser({userid, password, clientid, userAgent}, (err, user) => {
    console.log(lib.time() + (err ? 'Signup NG' : 'Signup OK'))
    if (err) return res.json({status: false, err})
    return res.json({status: true, user, token: lib.getToken(clientid, user)})
  })
})

app.post('/login', (req, res) => {
  const { userid, password, clientid, userAgent, version } = req.body
  console.log(lib.time() + '/login', userid, version)
  libUser.login({userid, password, clientid, userAgent}, (err, user) => {
    if (err) return res.json({status: false, err})
    return res.json({status: true, user, token: lib.getToken(clientid, user)})
  })
})

app.post('/auth', (req, res) => {
  const { session } = req.body
  console.log(lib.time() + '/auth', session.version)
  libUser.authentication(session, (err, user) => {
    console.log(lib.time() + '/auth ' + (err ? 'NG' : 'OK'))
    if (err) return res.json({status: false, err})
    return res.json({status: true, user})
  })
})

app.listen(3000)