const express = require("express");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");
const { MongoClient } = require("mongodb");
var cors = require('cors')



const url = "mongodb://localhost:27017";
const client = new MongoClient(url);


const dbName = "PassManager";
const port = 3000;

app.use(bodyparser.json());
app.use(cors())

client.connect();


//Get All the password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

//Save All the password
app.post("/", async (req, res) => {
    const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({Success:true, Result:findResult})
});

//Delete Password
app.delete("/", async (req, res) => {
    const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({Success:true, Result:findResult})
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
