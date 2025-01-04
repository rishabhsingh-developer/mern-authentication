import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://rish:rish@auth-app.os3ro.mongodb.net/auth-app?retryWrites=true&w=majority&appName=auth-app"
  )
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));
app.use(cors());
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = req.statusCode || 500;
  const message = err.message;
  res.json({
    message,
    statusCode,
  });
});

app.listen(3000, () => console.log("server start listning on port 3000"));
