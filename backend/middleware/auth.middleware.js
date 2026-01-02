import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";


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