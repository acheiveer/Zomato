import express from "express"
import { FoodModel } from "../../database/food";

const Router = express.Router();
/*
 * Route     /:_id
 * Des       Create new food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/new",async (req,res)=>{
    try {
        const {foodData} = req.body;
        const food = await FoodModel.create({ ...foodData }) //In this line, the spread operator (...) is used to spread the contents of the foodData object into the object being passed to the create() method. This means that each key-value pair in foodData is individually added to the object being created by create(). So, if foodData is { name: 'Pizza', category: 'Italian' }, the resulting object passed to create() would be { name: 'Pizza', category: 'Italian' }. This is typically used when you have the data you want to insert already separated into individual key-value pairs.
        return res.json({food})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

/*
 * Route     /:_id
 * Des       Get food details on id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id",async (req,res)=>{
    try {
        const {_id} = req.params;
        const foods = await FoodModel.findById(_id);
        return res.json({foods}) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});
/**
 * Route     /r:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/r/:_id",async (req,res)=>{
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({restaurant: _id})
        return res.json({foods}) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})
/**
 * Route     /c:_category
 * Des       Get all food based on particular category
 * Params    category
 * Access    Public
 * Method    GET
 */
Router.get("/c/:category",async (req,res)=>{
    try {
        const {category} = req.params;
        const foods = await FoodModel.find({  
            category :{ $regex:category, $options:"i"}   //{ category: { $regex: category, $options: "i" } }: This is the search criteria. It's using the MongoDB $regex operator for pattern matching with the category field of the documents. Additionally, the $options: "i" parameter ensures that the regular expression search is case-insensitive.
        });
        if(!foods){
            return res.status(400).json({error:`Nop food of the ${category}`})
        }
        return res.json({foods})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

export default Router;
