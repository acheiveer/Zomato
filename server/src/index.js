import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
dotenv.config();

//Private Route Authentication configuration
import PrivateRouteConfig from "./config/route_config"
import googleAuthConfig from "./config/google_config"

//Databse Connection
import ConnectDB from "./database/connection"

import Auth from "./api/auth"
import Food from "./api/food"
import Restaurant from "./api/restaurant"
import User from "./api/user"
import Menu from "./api/menu"
import Order from "./api/order"
import Review from "./api/review"
import Image from "./api/image"

// adding additional passport configuration
PrivateRouteConfig(passport);
googleAuthConfig(passport);

const zomato = express();
zomato.use(express.json());
zomato.use(session({
    secret: process.env.JWT_SECRET,
    proxy:true,
    resave:true,
    saveUninitialized:true
}));
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
zomato.use("/menu",Menu)
zomato.use("/order",Order)
zomato.use("/review",Review)
zomato.use("/image",Image)


const PORT=4000;

zomato.listen(PORT,()=>{
    ConnectDB().then(()=>{
        console.log(`Server is running on ${PORT} and DB connected`)
    })
    .catch((error)=>{
        console.log(`Server is running but DB connection failed....`)
        console.log(error);
    })
    //console.log(`Server is running on ${PORT}`)
   
})