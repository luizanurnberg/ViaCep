import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

run();

export {
  client
}