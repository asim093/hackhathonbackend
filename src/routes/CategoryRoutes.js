import { Addcategory, getCategory, getsinglecategory } from "../controllers/CategoryController.js";
import express from "express";
import AddSubcategory from "../controllers/Subcategorycontroller.js";

const router = express.Router();

router.post('/Addcategory' , Addcategory)
router.get('/getcategory' , getCategory)
router.get('/getsinglecategory/:id' , getsinglecategory)
router.post('/AddSubcategory' , AddSubcategory)

export default router