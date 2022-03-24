const express = require("express");
const cors = require("cors");

const app = new express();

app.use(cors());

app.get("/", (req, res)=>{
    res.send("Ok");
})

app.listen(3000, ()=>{
    console.log("Server run on port 3000");
})