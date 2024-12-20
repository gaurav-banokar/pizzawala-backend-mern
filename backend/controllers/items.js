import { asyncError } from "../middlewares/errorMiddleware.js";
import { Item } from "../models/Item.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { cache } from "../app.js";

export const getAllItemsBySearch = asyncError(async (req, res) => {
  const sideAndBeveragesArr = ["bread", "dips", "desserts"];
  const keyword = req.query.keyword.toLowerCase();

  let items = [];
   items = await Item.find({
    itemName: {
      
        "$or": [
          { "$regex": { "$in": [`.*${keyword}.*`, `^non`] } },
          { "$regex": { "$in": [`.*${keyword}.*` , `^veg`] } }
        ]  
      ,
      $options: "i",
    },
  });
  if (items.length !== 0) {
    res.status(200).json({
      success: true,
      items,
    });
  } else {
    let newkeyword;
    if (keyword.startsWith("veg")) {
      newkeyword = "vegPizza";
    } else if (keyword.startsWith("non")) {
      console.log("Non clickedd");
      newkeyword = "nonVegPizza";
    } else if (keyword.startsWith("pasta")) {
      newkeyword = "pasta";
    } else if (
      sideAndBeveragesArr.includes(keyword) ||
      sideAndBeveragesArr.includes(keyword) ||
      sideAndBeveragesArr.includes(keyword)
    ) {
      newkeyword = "sideAndBeverages";
    } else {
      newkeyword;
    }

    const items = await Item.find({
      itemCategory: newkeyword,
    });

    res.status(200).json({
      success: true,
      items,
    });
  }
});

export const getAllItemsByCategory = asyncError(async (req, res) => {
 const cacheKey = 'products';
  const cacheProducts = cache.get(cacheKey); 

  if(cacheProducts) {
    return res.json(cacheProducts);
  }
  const items = await Item.find({ itemCategory: req.query.category });
  cache.set(cacheKey,items,60*10)
  res.status(200).json({
    success: true,
    items,
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
  const { itemNumber, itemName, itemPrice } = req.body;

  const itemCategory = "nonVeg";
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
