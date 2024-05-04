const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://iwannabeacookie:sGJQHv3nePFLzoym@forzanapoliinc.tqmgi1i.mongodb.net/?retryWrites=true&w=majority&appName=ForzaNapoliInc"

const mClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function connect() {
  await mClient.connect()
  mClient.db('UserData').command({ ping: 1 })
  .then(() => console.log("Pinged your deployment. You successfully connected to MongoDB!"), () => console.log("Connection to database failed!"))
}

connect()

return mClient
