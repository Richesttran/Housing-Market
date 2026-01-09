const { MongoClient, ServerApiVersion } = require('mongodb');
const {ImportCSV}= require("./ImportCSV")
require("dotenv").config();


const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;
const PORT =process.env.PORT;
const express = require("express");
const app= express();
const uri = `mongodb+srv://${API_USERNAME}:${API_PASSWORD}@housing.brudlsz.mongodb.net/?appName=Housing`;
let connected="not connected"
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    connected="connected"
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
async function seed()
{

    const housingDataList= []
    housingDataList= ImportCSV("HousingData.csv")

};
app.get("/",(req,res)=> {
    res.send(`MONGO DB Server is... ${connected}`);
});

app.post("/api/data", (req, res) => {
  res.json({
    received: req.body,
  });
});
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});


seed().catch(console.dir);