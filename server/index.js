import express from "express";
import dotenv from "dotenv"
dotenv.config();

//Databse Connection
import connectDB from "./database/connection"

import Auth from "./api/food"

const zomato = express();
zomato.use(express.json());

zomato.get("/",(req,res)=>{
    return res.json({
        message:"Server is running"
    })
})

//auth/signup
zomato.use("/auth",Auth)

const PORT=4000;

zomato.listen(PORT,()=>{
    connectDB().then(()=>{
        console.log(`Server is running on ${PORT} and DB connected`)
    })
    .catch((error)=>{
        console.log(`Server is running but DB connection failed....`)
        console.log(error);
    })
    //console.log(`Server is running on ${PORT}`)
   
})