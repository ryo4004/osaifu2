const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const client = './client/build'
app.use('/', express.static(client))
app.use('/login', express.static(client))
app.use('/signup', express.static(client))
app.use('/payment', express.static(client))
app.use('/list', express.static(client))
app.use('/setting', express.static(client))
app.use('/setting/username', express.static(client))
app.use('/setting/othername', express.static(client))
app.use('/setting/password', express.static(client))
app.use('/setting/osaifuname', express.static(client))
app.use('/setting/connect', express.static(client))

const lib = require('./server/library')
const libUser = require('./server/user')
const libList = require('./server/list')
const libConnect = require('./server/connect')

app.post('/signup', (req, res) => {
  const { userid, password, clientid, userAgent, version } = req.body
  console.log(lib.time() + '/signup', userid, version)
  if (!userid) return res.json({status: false, err: {type: 'blankUserid'}})
  if (!password) return res.json({status: false, err: {type: 'blankPassword'}})
  libUser.addUser({userid, password, clientid, userAgent}, (addUserError, user) => {
    console.log(lib.time() + (addUserError ? 'Signup NG' : 'Signup OK'))
    if (addUserError) return res.json({err: addUserError})
    libList.createDB(user, (createDBError, status) => {
      return res.json({user, token: lib.getToken(clientid, user), status, err: createDBError})
    })
  })
})

app.post('/login', (req, res) => {
  const { userid, password, clientid, userAgent, version } = req.body
  console.log(lib.time() + '/login', userid, version)
  libUser.login({userid, password, clientid, userAgent}, (err, user) => {
    return res.json({user, err, token: lib.getToken(clientid, user)})
  })
})

app.post('/logout', (req, res) => {
  const { session } = req.body
  console.log(lib.time() + '/logout')
  libUser.deleteSession(session, (err, result) => {
    console.log(lib.time() + '/logout ' + (result ? 'OK' : 'NG'))
    return res.json({})
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

app.post('/payment', (req, res) => {
  const { session, payment } = req.body
  console.log(lib.time() + '/payment')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libList.addPayment(user, payment, (addPaymentError, newdoc) => {
      return res.json({status: newdoc && true, err: addPaymentError})
    })
  })
})

app.post('/list', (req, res) => {
  const { session } = req.body
  console.log(lib.time() + '/list')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libList.getList(user, (getListError, list) => {
      return res.json({list, err: getListError})
    })
  })
})

app.post('/delete', (req, res) => {
  const { session, id } = req.body
  console.log(lib.time() + '/delete: ' + id)
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libList.deletePayment(user, id, (deletePaymentError, result) => {
      return res.json({result, err: deletePaymentError})
    })
  })
})

app.post('/setting/username', (req, res) => {
  const { session, username } = req.body
  console.log(lib.time() + '/setting/username')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libUser.updateUsername(user, username, (updateUsernameError, newUser) => {
      return res.json({user: newUser, err: updateUsernameError})
    })
  })
})

app.post('/setting/othername', (req, res) => {
  const { session, othername } = req.body
  console.log(lib.time() + '/setting/othername')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libUser.updateOthername(user, othername, (updateOthernameError, newUser) => {
      return res.json({user: newUser, err: updateOthernameError})
    })
  })
})

app.post('/setting/password', (req, res) => {
  const { session, oldPassword, newPassword } = req.body
  console.log(lib.time() + '/setting/password')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libUser.updatePassword(user, oldPassword, newPassword, (updatePasswordError, newUser) => {
      return res.json({user: newUser, err: updatePasswordError})
    })
  })
})

app.post('/setting/osaifuname', (req, res) => {
  const { session, osaifuname } = req.body
  console.log(lib.time() + '/setting/osaifuname')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libList.updateOsaifuname(user, osaifuname, (updateUsernameError, status) => {
      return res.json({status, err: updateUsernameError})
    })
  })
})

app.post('/setting/connect', (req, res) => {
  const { session, oldPass } = req.body
  console.log(lib.time() + '/setting/connect')
  libUser.authentication(session, (authError, user) => {
    if (authError) return res.json({err: authError})
    libConnect.newConnect(user, oldPass, (updateUsernameError, pass) => {
      return res.json({pass, err: updateUsernameError})
    })
  })
})

app.listen(3000)