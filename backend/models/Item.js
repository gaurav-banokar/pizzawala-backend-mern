import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemNumber:{
        type:String,
        required:true,
    },
    itemName: {
        type:String,
        required:true,
    },
    itemImage:{
        public_id: {
            type:String,

        },
        url: {
            type:String
        }
    },
    itemPrice: {
        type:String,
        required:true,
    },
    itemCategory: {
        type:String,
        required:true
    }
})

export const Item = mongoose.model("Item",itemSchema);