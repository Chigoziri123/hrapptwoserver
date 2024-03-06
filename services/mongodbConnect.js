const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectionString =
  process.env.ATLAS_DATABASE;
const client = new MongoClient(connectionString);

async function connectToDB() {
  let conn;
  try {
    conn = await client.connect();
    console.log("connection successful");
  } catch (e) {
    console.error(e);
  }

  return conn.db("hrapptwo");
}

module.exports = connectToDB;