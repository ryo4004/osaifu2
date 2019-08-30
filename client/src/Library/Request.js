import request from 'superagent'

export function post () {
  request.post(url)
    .type('form')
    .send(send)
    .end((err, response) => {
      return callbackify(err, response)
    })
}