import express from "express"

import { UserModel } from "../../database/user"

const Router = express.Router();

/**
 * Route     /signup
 * Des       Create new user
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/signup",async (req,res)=>{
    try {
        const {credentials} = req.body;
        if (!credentials) {
            throw new Error("No credentials provided");
        }
        await UserModel.findByEmailAndPhone(credentials);
        const newUser = await UserModel.create(credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status:"Success"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})


/**
 * Route     /signin
 * Des       login to existing user
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/signin",async (req,res)=>{
    try {
        const {credentials} = req.body;
        if (!credentials) {
            throw new Error("No credentials provided");
        }
        const user = await UserModel.findByEmailAndPassword(credentials);
        const token = user.generateJwtToken();
        res.status(200).json({token, status:"Sucecss"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default Router;