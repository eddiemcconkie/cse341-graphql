import { MongoClient } from 'mongodb'

let _client: MongoClient

export const init = (callback) => {
  if (_client) {
    console.log('Database is already initialized')
    return callback(null, _client)
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _client = client
      callback(null, _client)
    })
    .catch((err) => {
      callback(err)
    })
}

export const db = () => {
  if (!_client) {
    throw Error('Database not initialized')
  }
  return _client.db()
}
