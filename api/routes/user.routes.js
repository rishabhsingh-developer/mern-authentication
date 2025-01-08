import express from "express";

import { test, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser } from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
