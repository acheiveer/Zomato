import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
dotenv.config();

//Private Route Authentication configuration
import PrivateRouteConfig from "./config/route_config"

//Databse Connection
import connectDB from "./database/connection"

import Auth from "./api/auth"
import Food from "./api/food"
import Restaurant from "./api/restaurant"
import User from "./api/user"

// adding additional passport configuration
PrivateRouteConfig(passport);

const zomato = express();
zomato.use(express.json());
zomato.use(session({secret: process.env.JWT_SECRET}));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/",(req,res)=>{
    return res.json({
        message:"Server is running"
    })
})

//auth/signup
zomato.use("/auth",Auth)
zomato.use("/food",Food)
zomato.use("/restaurant",Restaurant)
zomato.use("/User", User)


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