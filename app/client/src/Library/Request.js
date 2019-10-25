import request from 'superagent'

export function post (url, send) {
  return new Promise((resolve, reject) => {
    request.post(url)
      .type('form')
      .send(send)
      .end((err, response) => {
        return err ? reject(err) : resolve(response)
      })
  })
}