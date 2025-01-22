import express from "express";
import { getUser, test, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser } from "../controllers/user.controllers.js";
import multer from "multer";
import { getUserListings } from "../controllers/user.controllers.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

export default router;
