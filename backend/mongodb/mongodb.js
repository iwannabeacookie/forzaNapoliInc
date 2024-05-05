import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
  "mongodb+srv://iwannabeacookie:sGJQHv3nePFLzoym@forzanapoliinc.tqmgi1i.mongodb.net/?retryWrites=true&w=majority&appName=ForzaNapoliInc";

const mClient_setup = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  await mClient_setup.connect();
  mClient_setup
    .db("UserData")
    .command({ ping: 1 })
    .then(
      () => {
        console.log("Connected to MongoDB!");
      },
      () => console.log("Connection to database failed!")
    );
    return mClient_setup;
}

export const mClient = await connect()
