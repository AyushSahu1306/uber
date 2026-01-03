import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Uber backend API"});
})

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/captains",captainRoutes);

app.use((err,req,res,next)=>{
  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
})

export default app;