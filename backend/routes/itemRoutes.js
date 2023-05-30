import express from "express";
import { createItem, getAllItems, getItem } from "../controllers/items.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();


router.get("/getAllItems",getAllItems);
router.get("/item/:id",getItem);
router.post("/admin/item/new",singleUpload, createItem)

export default router;