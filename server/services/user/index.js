import events from 'events'
import server from './server/server.js'
import repository from './repository/index.js'
import config from './config/index.js'
import database from '../../db.js'

const eventEmitter = new events()
console.log('--- User Service ---')
console.log('Connecting to repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

eventEmitter.on('db.ready', (db) => {
  let rep
  repository.connect(db)
    .then(repo => {
      console.log('Connected. Starting Server')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
})

eventEmitter.on('db.error', (err) => {
  console.error(err)
})

database.connect(eventEmitter )

eventEmitter.emit('boot.ready')