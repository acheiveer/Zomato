import express from "express"

import { UserModel } from "../../database/user"

const Router = express.Router();

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