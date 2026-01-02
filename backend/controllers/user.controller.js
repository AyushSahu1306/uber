import { validationResult } from "express-validator";
import { loginUser, registerUser } from "../services/user.service.js"

export const register = async(req,res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await registerUser(req.body);
        return res.status(201).json({
            token:user.token,
            user:user.data
        })
    } catch (error) {
        next(error);
    }
}

export const login = async(req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email,password} = req.body;
        const result = await loginUser(email,password);

        res.cookie('token',result.token);
        res.status(200).json(result);

    } catch (error) {
        next(err);
    }
}

export const getProfile = (req,res,next) => {
    if (!req.user) {
        return next(new AppError("Unauthorized", 401));
  }
    res.status(200).json(req.user);
}

export const logout = (req,res) => {
    res.clearCookie("token");
    res.status(200).json({message:"Logged Out Successfully"});
}