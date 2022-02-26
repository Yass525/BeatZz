//import status from 'http-status'

const api =  (app, options) => {
  const {repo} = options

  app.get('/', (req, res) => {
    res.send('Auth service is working')
  })

}

export default api;