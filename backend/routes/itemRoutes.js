import express from "express";
import { createItem, getAllItemsByCategory, getAllItemsBySearch, getItem } from "../controllers/items.js";
import singleUpload from "../middlewares/multer.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import { Item } from "../models/Item.js";
import { authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();


router.get("/getAllItemsBySearch", getAllItemsBySearch);
router.get("/getAllItemsByCategory",getAllItemsByCategory);
router.get("/item/:id", getItem);
router.post("/admin/item/new", singleUpload,authorizeAdmin, createItem)

export default router;