import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";

const app = express();

connectDB();

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello");
})

app.use((err,req,res,next)=>{
    const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
})

export default app;