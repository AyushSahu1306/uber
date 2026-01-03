import { validationResult } from "express-validator";
import { loginCaptain, registerCaptain } from "../services/captain.service.js";

export const register = async(req,res,next)=>{
    try {
        const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
        const result = await registerCaptain(req.body);

        res.status(201).json(result);
        
    } catch (error) {
        next(error);
    }
}

export const login = async(req,res,next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const { captain, token } = await loginCaptain(req.body);

        res.cookie("token",token);
        res.status(200).json({captain,token});

    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req , res , next)=>{
    if (!req.captain) {
        return next(new AppError("Unauthorized", 401));
    }
    res.status(200).json({captain:req.captain})
}

export const logout = async (req, res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Logged out successfully"})
}