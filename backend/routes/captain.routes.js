import express from "express";
import { loginValidator, registerValidator } from "../validators/captain.validator.js";
import { getProfile, login, logout, register } from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",registerValidator,register);

router.post("/login",loginValidator,login);

router.get("/profile" , authCaptain , getProfile);

router.get("/logout" , authCaptain , logout);

export default router;