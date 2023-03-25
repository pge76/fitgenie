import { MongoClient } from "mongodb";

console.log("env", process.env);
console.log("ATLAS_URI", process.env.ATLAS_URI);

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db("fitapp");

export default db;