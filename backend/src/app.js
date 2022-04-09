const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDb = require("./util/database");
const path = require("path");

const userRouter = require("./routes/user-route");
const authenticationRouter = require("./routes/authentication");
const adminRouter = require("./routes/admin-route");
const platRouter = require("./routes/plat-route");
const commandeRouter = require("./routes/commande-route");
const beneficeRouter = require("./routes/benefice-route");

const app = new express();
app.use(cors({
    credentials : true,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin : "*",
}));


mongoDb.connect();

app.use(express.static(path.resolve(process.cwd(), 'dist/frontend')))
app.use(express.json());

app.use("/api", authenticationRouter);
app.use("/api", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/plat", platRouter);
app.use("/api/commande", commandeRouter);
app.use("/api/benefice", beneficeRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'dist/frontend/index.html'))
})

app.listen(process.env.PORT ||3000, ()=>{
    console.log("Server run on port 3000");
})

