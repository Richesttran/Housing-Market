import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { ImportCSV } from "../ImportCSV.js";

dotenv.config();

const uri = process.env.MONGODB_URI;
console.log("hithere"+uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    connected="connected"
  } catch (err)
  {  connected= err}
}

async function insertData(data)
{
  try{
      await client.connect();
      //get cluster
      const db = client.db("Housing")
      // get collection
      const collection= db.collection("HousingHistory")
      //insert or seed data into the collection
      const result = await collection.insertMany(data);
      console.log(`Inserted Data ${result.insertedCount}`)
    }
    catch(err)
    {
      console.error(err)
    }
    
};
export default async function InsertData()
{
  try{
    const housingDataList=  await ImportCSV("HousingData.csv")
    console.log("connecting to DB")
    await connectDB().catch(console.dir);
    console.log("Inserting Data...")
    await insertData(housingDataList).catch(console.dir);
    console.log("finished")
  }catch (err){
    console.error(err);
  }finally{
    await client.close();
  } 

}