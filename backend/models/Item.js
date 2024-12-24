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
        type:Object,
        required:true,
        public_id: {
            type:String,
            required:true
        },
        url: {
            type:String,
            required:true
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