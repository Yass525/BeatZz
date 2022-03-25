//import status from 'http-status'
import config from '../config/index.js'
import axios from 'axios'
import bodyParser from 'body-parser';
import audit from 'express-requests-logger'
import logger from 'bunyan'


const jsonParser = bodyParser.json()
const api =  (app, options) => {
  const {repo} = options
  
  // rate limiting
  const authApiLimiter = config.authApiLimiter

  const userApiLimiter = config.userApiLimiter

  const streamingApiLimiter = config.streamingApiLimiter

  //Rate limiting the auth service
  app.use('/auth', authApiLimiter)

  //Rate limiting the user service
  app.use('/user', userApiLimiter)

  //Rate limiting the user service
  app.use('/streaming', streamingApiLimiter)



  app.use(audit({
    logger: logger,
    excludeURLs: ['/streaming'], // Exclude paths 
    request: {
        maskBody: ['password'], // Mask 'password' field in incoming requests
        excludeHeaders: ['authorization'],
        //excludeBody: ['creditCard'],
        //maskHeaders: ['header1'],
        maxBodyLength: 100 
    },
    response: {
        maskBody: ['session_token'], // Mask 'session_token' field in response body
        excludeHeaders: ['*'], // Exclude all headers from responses,
        //excludeBody: [], 
        maskHeaders: ['header1'], 
        maxBodyLength: 100 
    }
}));


  app.get('/',jsonParser, (req, res) => {
    //console.log(req.body)
    res.send('Aggregator service is working')
  })


  app.get('/status', (req, res) => {
    // check all services by pinging route 
    // options.servicesSettings
  })

  app.post('/api/auth/register', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/register';
    //const response = await request(uri)

    axios.post(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })


  app.post('/api/auth/login', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/login';
    //const response = await request(uri)
   
    axios.post(uri,req.body).then(r=>{
      //console.log("============== RESPONSE DATA =============")
      console.log(r.data)
      //console.log("============== FULL  STATUS  ============")
     
      if(r.data.accessToken){
      res.json(r.data)
      }

      if(r.response.status != 200){
        res.status(r.response.status).send("An error has occured")
      }
    }).catch(r=>{
      if(!r)
      return
      console.log("=================catch=================")
      console.log(r)
      if(r.response.status == 400){
        res.status(r.response.status).send("Account not found")
      }else{
        res.status(r.response.status).send("An error has occured!")
      }
    })
    
  })

  app.post('/api/auth/logout', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/logout';
    //const response = await request(uri)
   
    axios.delete(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })


  app.post('/api/auth/refreshToken', jsonParser, (req, res) => {
    //const token = 
    const uri = config.services.auth.url+':'+config.services.auth.port+'/auth/refresh-token';
    //const response = await request(uri)
   
    axios.post(uri,req.body).then(r=>{
      //console.log("============== RESPONSE =============")
      //console.log(r.data)
      res.json(r.data)
    })
    
  })







}

export default api;