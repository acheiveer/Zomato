import express from "express";
import { RestaurantModel } from "../../database/allModels";
import { 
    validateRestaurant,
    validateRestaurantCity,
    validateSearchString
 } from "../../validation/restaurant_validation";

const Router = express.Router();

/**
 * Route     /
 * Des       create new restaurant
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/new",async (req,res)=>{
    try {
        const {restaurantData} = req.body;
        const restaurant = await RestaurantModel.create({...restaurantData})
        return res.json({restaurant})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

/**
 * Route     /
 * Des     Get all the restuarant details based on the city
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/",async (req,res)=>{
    try {
        // http://localhost:4000/restaurant/?city=delhi
        const {city} = req.query;
        await validateRestaurantCity(req.query);
        const restaurants = await RestaurantModel.find({city});
        if(restaurants.length === 0){
            return res.status(404).json({error: "No restaurant found in this city."})
        }
        return res.json({restaurants})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})
/**
 * Route     /:_id
 * Des       Get individual restaurant details based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id",async (req,res)=>{
    try {
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant){
            return res.status(404).json({error:"Resturant not found"})
        }
        return res.json({restaurant})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})
/**
 * Route     /search/:searchString
 * Des       Get restaurants details based on search string
 * Params    searchString
 * Access    Public
 * Method    GET
 */
Router.get("/search/:searchString",async (req,res)=>{
   /**
   * searchString = Raj
   * results = {
   *  RajHotel
   *  RajRow
   *  RonRaj
   *  raJRow
   * }
   */
    try {
        const {searchString} = req.params;
        await validateSearchString(req.params);
        const restaurants = await RestaurantModel.find({
            name: {$regex:searchString, $options:"i"}
        });
        if(!restaurants.length === 0){
            return res.status(404).json({error:`No Resturant matched with ${searchString}`})
        };
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

export default Router;