import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://rish:rish@auth-app.os3ro.mongodb.net/auth-app?retryWrites=true&w=majority&appName=auth-app"
  )
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

app.listen(3000, () => console.log("server start listning on port 3000"));
