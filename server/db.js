import mongo from 'mongodb'
const MongoClient = mongo.MongoClient

const url = "mongodb+srv://memoryMern:megaman500@realmcluster.xqs34.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 

const connect = (event) => {
  event.once('boot.ready', () => {
    MongoClient.connect(
      url,true, (err, db) => {
        if (err) {
          event.emit('db.error', err)
        }

        /*db.admin().authenticate(options.user, options.pass, (err, result) => {
          if (err) {
            event.emit('db.error', err)
          }*/
          event.emit('db.ready', db.db())
        //})
      })
  })
}

export default Object.assign({}, {connect})

