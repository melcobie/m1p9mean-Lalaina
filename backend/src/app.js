const express = require("express");
const cors = require("express-cors");
const mongoDb = require("./util/database");

const app = new express();

mongoDb.connect(()=>{
    app.use(express.json());
    app.use(express.urlencoded({extended : false}));
    app.use(cors());

    const userCollection = mongoDb?.get()?.collection("users1");
    app.get("/", (req, res)=>{
        userCollection?.find()?.toArray()
            .then((result)=>{
                res.send(result);
            }).catch(error => console.log(error));
    });

    app.post("/", (req, res) => {
        userCollection?.insertOne(req?.body)
            .then((result)=>{
                res.status(201).send("Ok");
            }).catch(error => console.log(error));
    })

    app.listen(3000, ()=>{
        console.log("Server run on port 3000");
    })
})

