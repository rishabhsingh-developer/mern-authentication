import express from "express";
import signup, { signin } from "../controllers/auth.controllers.js";
import { google } from "../controllers/auth.controllers.js";
const router = express.Router();

import { signout } from "../controllers/auth.controllers.js";
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);
export default router;
