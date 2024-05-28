import express from "express"
import { ValidationSignIn, ValidationSignUp } from "../../validation/auth_validation";
import { UserModel } from "../../database/allModels"

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
        await ValidationSignUp(credentials);
        await UserModel.findByEmailAndPhone(credentials);
        const newUser = await UserModel.create(credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status:"Success"});
    } catch (error) {
        return res.status(500).json({error: error.message});
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
        await ValidationSignIn(credentials);
        const user = await UserModel.findByEmailAndPassword(credentials);
        const token = user.generateJwtToken();
        res.status(200).json({token, status:"Sucecss"});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default Router;