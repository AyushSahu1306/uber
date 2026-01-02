import express from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller.js";
import { loginValidator, registerValidator } from "../validators/user.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();



router.post("/register",registerValidator,register);

router.post("/login",loginValidator,login);

router.get("/profile",authUser,getProfile);

router.get("/logout",authUser,logout);


export default router;