import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

client.connect();

let db = client.db(procces.env.DATABASE_NAME);

export default db;