import express from "express"

import { UserModel } from "../../database/user"

const Router = express.Router();

Router.post("/signup",async (req,res)=>{
    try {
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status:"Success"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

Router.post("/signin",async (req,res)=>{
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        res.send(200).json({token, status:"Sucecss"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default Router;