import { asyncError } from "../middlewares/errorMiddleware.js";
import { Item } from "../models/Item.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { cache } from "../app.js";

export const getAllItemsBySearch = asyncError(async (req, res) => {
  
  const keyword = req.query.keyword.toLowerCase();

  const items = await Item.find({
    itemName: {
      $regex:`\\b${keyword}\\b`
      ,
      $options: "i",
    },
  });

    res.status(200).json({
      success: true,
      items,
    });
  
});

export const getAllItemsByCategory = asyncError(async (req, res) => {
 
  
 const cacheKey = req.query.category;
  const cacheProducts = cache.get(cacheKey); 

  Item.watch().on("change", async () => {
    if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
      cache.del(cacheKey)
      const items = await Item.find({ itemCategory: req.query.category });
      cache.set(cacheKey,items)
  
  }
  })

  if(cacheProducts) {
    return res.json({newCacheProducts:cacheProducts});
  }
  
  const items = await Item.find({ itemCategory: req.query.category });
  
  
  cache.set(cacheKey,items)

  const newCacheProducts = cache.get(cacheKey);
  res.status(200).json({
    success: true,
    newCacheProducts
  });
});

export const getItem = asyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  res.status(200).json({
    success: true,
    item,
  });
});

export const createItem = asyncError(async (req, res, next) => {
  const { itemNumber, itemName, itemPrice, itemCategory } = req.body;

  
  const file = req.file;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "items",
  });

  await Item.create({
    itemNumber,
    itemName,
    itemImage: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
    itemPrice,
    itemCategory,
  });

  res.status(200).json({
    success: true,
    message: "Item Created Successfully",
  });
});
