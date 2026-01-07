const express = require("express");
const app= express();
const PORT =3000;

app.use(express.json());

app.get("/",(req,res)=> {
    res.send("Express seasdsadreassdar runasdndasding");
});

app.post("/api/data", (req, res) => {
  res.json({
    received: req.body,
  });
});
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});