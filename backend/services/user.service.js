import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { hashPassword } from "../utils/hash.js";

export const registerUser = async({fullname, email, password}) => {
     if (!fullname?.firstname || !email || !password) {
        throw new AppError('Missing required fields',400);
     }

     const existingUser = await User.findOne({email});

     if(existingUser){
        throw new AppError("User already exists",409);
     }

     const hashedPassword = await hashPassword(password);

     const user = new User({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password:hashedPassword
     });

     await user.save();

    const token = user.generateAuthToken();

    return {
        token,
        data:{
            id:user._id,
            fullname:user.fullname,
            email:user.email
        }
    }
}