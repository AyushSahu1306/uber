import { validationResult } from "express-validator";
import { registerUser } from "../services/user.service"

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