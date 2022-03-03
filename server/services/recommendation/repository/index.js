const repository = (db) => {
    const collection = db.collection('')


    const disconnect = () => {
        db.close()
      }
    
      return Object.create({
        disconnect
      })
    }
    
    const connect = (connection) => {
      return new Promise((resolve, reject) => {
        if (!connection) {
          reject(new Error('connection db not supplied!'))
        }
        resolve(repository(connection))
      })
}
    
export default Object.assign({}, {connect})