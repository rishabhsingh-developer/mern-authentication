import express from "express";
import {
  createListing,
  getListing,
  getListings,
  updateListing,
} from "../controllers/listing.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteListing } from "../controllers/listing.controllers.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
export default router;
