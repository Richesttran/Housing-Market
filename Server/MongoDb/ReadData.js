import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
// get URI
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function getAllHousingData(){
    try{
        await client.connect();
        // get db
        const db = client.db("Housing");
        // get collection/table
        const collection = db.collection("HousingHistory");
        // make a query search
        const results = await collection.find({}).toArray();
        return results;
    }
    catch(err)
    {
        console.log(err)
    }
}