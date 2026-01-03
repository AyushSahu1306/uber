import Captain from "../models/captain.model.js";
import AppError from "../utils/AppError.js";
import { hashPassword } from "../utils/hash.js";

export const registerCaptain = async({fullname,email,password,vehicles})=>{

    if (!fullname?.firstname || !email || !password || !vehicles) {
        throw new AppError("Missing required fields", 400);
    }

    const exists = await Captain.findOne({email});

    if (exists) {
        throw new AppError("Captain already exists", 409);
    }

    const hashedPassword = await hashPassword(password);

    const captain = new Captain({
        fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname, 
        },
        email,
        password: hashedPassword,
        vehicles: {
            color: vehicles.color,
            plate: vehicles.plate,
            capacity: vehicles.capacity,
            vehicleType: vehicles.vehicleType,
        },
    });

    await captain.save();

    const token = captain.generateAuthToken();

    return {captain,token};

}

export const loginCaptain = async({email,password}) => {

    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        throw new AppError("Invalid credentials",401);
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        throw new AppError("Invalid credentials",401);
    }

    const token = captain.generateAuthToken();

    const captain_ = {
        id:captain._id,
        fullname:captain.fullname,
        email:captain.email,
        vehicles:captain.vehicles
    }

    return {
        token,
        captain:captain_
    };

}
