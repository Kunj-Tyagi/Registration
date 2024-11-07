require("dotenv").config();

const sessionOptions={
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 5 * 60 * 1000 // 5 minutes
    }
  }

module.exports=sessionOptions;