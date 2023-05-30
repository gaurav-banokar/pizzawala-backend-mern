import { asyncError } from "../middlewares/errorMiddleware.js";
import { Item } from "../models/Item.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getAllItems = asyncError(async (req, res) => {
    const items = await Item.find({});

    res.status(200).json({
        success:true,
        items,
    })
})

export const getItem = asyncError(async (req,res,next) => {
    console.log(req.params.id)
    const item = await Item.findById(req.params.id);

    res.status(200).json({
        success:true,
        item,
    })

})

export const createItem = asyncError( async (req,res,next) => {
    const { itemNumber,itemName, itemPrice } = req.body;
   

    const file = req.file;
   
    
    const fileUri = getDataUri(file);

    // console.log("fileUri : ",fileUri.content)

        const mycloud =  await cloudinary.v2.uploader.upload(fileUri.content,{folder:'items'});
        

   
        await Item.create({
            itemNumber,
            itemName,
            itemImage:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url,
            },
            itemPrice
        })

    res.status(200).json({
        success:true,
        message:"Item Created Successfully"
    })
})

