import Captain from "../models/captain.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const authUser = async(req,res,next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            throw new AppError("Unauthorized", 401);
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if(!user){
            throw new AppError("User no longer exists", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export const authCaptain = async(req,res,next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
        if(!token){
            throw new AppError("Unauthorized", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await Captain.findById(decoded._id);
        if (!captain) {
            throw new AppError("Captain no longer exists", 401);
        }

        req.captain = captain;
        next();
    } catch (error) {
        next(error);
    }
}