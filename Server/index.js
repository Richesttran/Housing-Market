import dotenv from "dotenv";
import express from "express";
import insertData from "./MongoDb/insertTableData.js"
import readData from "./MongoDb/ReadData.js"
dotenv.config();

const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;
const PORT =process.env.PORT;
const app= express();
let connected="not connected"
app.use(express.json());



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
try {
//recieve data from the the server
const data=readData();

}
catch(err)
{
  console.log(err)
}