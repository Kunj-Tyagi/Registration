const express = require("express");
const app = express();
const dotenv=require("dotenv").config();
const errorhandler = require("./middleware/errorHandler");
const sessionOption= require("./middleware/sessionOptions");
const session = require('express-session');
const connectDb = require("./config/dbconnection");
const otpLimiter = require("./middleware/otplimiter");
const port=process.env.PORT;

connectDb();

app.use(otpLimiter);
app.use(session(sessionOption));
app.use(express.json());
app.use("/api",require("./routes/signRoutes"))
app.use(errorhandler);

app.listen(port,()=>{
    console.log("Server is started!");
})