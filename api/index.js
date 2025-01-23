import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const PORT = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

app.listen(PORT, () => console.log("server start listning on port 3000"));
