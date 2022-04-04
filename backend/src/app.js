const express = require("express");
const cors = require("cors");
const mongoDb = require("./util/database");

const userRouter = require("./routes/user-route");
const authenticationRouter = require("./routes/authentication");

const app = new express();
app.use(cors({
    credentials : true,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin : "*",
}));


mongoDb.connect();

app.use(express.static("public", {etag: false}));
app.use(express.json());

app.use("/api/", authenticationRouter);
app.use("/api/user", userRouter);

app.listen(3000, ()=>{
    console.log("Server run on port 3000");
})

