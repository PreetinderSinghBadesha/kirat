import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  console.log('no mongo');
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In dev mode, use a global variable so it doesn't create new client every reload
  console.log('in dev mode');
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In prod, create a new client
  console.log('in prod mode');
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
