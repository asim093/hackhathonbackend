import express from "express";
import { createloan } from "../controllers/AddloanController.js";
const router = express.Router();

router.post("/createloan", createloan);

export default router