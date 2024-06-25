const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
const url = "mongodb://localhost:27017";
const dbName = "PassBank";

async function main() {
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // Define routes
    app.get("/", async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection("Passwords");
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    app.post("/", async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("Passwords");
      const findResult = await collection.insertOne(password);
      res.json({ success: true, result: findResult });
    });
    app.delete("/", async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("Passwords");
      const findResult = await collection.deleteOne(password);
      res.json({ success: true, result: findResult });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

main();
