//import status from 'http-status'

const api =  (app, options) => {
  const {repo} = options

  app.get('/', (req, res) => {
    res.send('Aggregator service is working')
  })


  app.get('/status', (req, res) => {
    // check all services by pinging route 
    // options.servicesSettings
  })


}

export default api;