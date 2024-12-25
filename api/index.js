import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose
  .connect(
    "mongodb+srv://rish:rish@auth-app.os3ro.mongodb.net/auth-app?retryWrites=true&w=majority&appName=auth-app"
  )
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("server start listning on port 3000 "));
