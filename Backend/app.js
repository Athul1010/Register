require("dotenv").config();
const express = require("express")
const app = express();
const mongoose = require("mongoose");
require("./Models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const port = 8009;

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log(`server is start port number ${port}`);
})