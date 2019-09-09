const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const client = './client/build'
app.use('/', express.static(client))
app.use('/login', express.static(client))
app.use('/signup', express.static(client))
app.use('/home', express.static(client))
app.use('/list', express.static(client))
app.use('/setting', express.static(client))
app.use('/setting/name', express.static(client))

const lib = require('./server/library')
const libUser = require('./server/user')
const libList = require('./server/list')

app.post('/signup', (req, res) => {
  const { userid, password, clientid, userAgent, version } = req.body
  console.log(lib.time() + '/signup', userid, version)
  if (!userid) return res.json({status: false, err: {type: 'blankUserid'}})
  if (!password) return res.json({status: false, err: {type: 'blankPassword'}})
  libUser.addUser({userid, password, clientid, userAgent}, (err, user) => {
    console.log(lib.time() + (err ? 'Signup NG' : 'Signup OK'))
    return res.json({user, err, token: lib.getToken(clientid, user)})
  })
})

app.post('/login', (req, res) => {
  const { userid, password, clientid, userAgent, version } = req.body
  console.log(lib.time() + '/login', userid, version)
  libUser.login({userid, password, clientid, userAgent}, (err, user) => {
    return res.json({user, err, token: lib.getToken(clientid, user)})
  })
})

app.post('/auth', (req, res) => {
  const { session } = req.body
  console.log(lib.time() + '/auth', session.version)
  libUser.authentication(session, (err, user) => {
    console.log(lib.time() + '/auth ' + (err ? 'NG' : 'OK'))
    return res.json({user, err})
  })
})

app.post('/status', (req, res) => {
  const { session } = req.body
  console.log(lib.time() + '/status', session.version)
  libUser.authentication(session, (authError, user) => {
    console.log(lib.time() + '/status ' + (authError ? 'NG' : 'OK'))
    if (authError) return res.json({err: authError})
    libList.getDBStatus(user, (getDBStatusError, status) => {
      return res.json({status, err: getDBStatusError})
    })
  })
})

app.post('/adddb', (req, res) => {
  const { session, name } = req.body
  console.log(lib.time() + '/adddb', name)
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libList.createDB(user, name, (createDBError, status) => {
      return res.json({status, err: createDBError})
    })
  })
})

app.listen(3000)