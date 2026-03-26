import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({

  id:{
    type:String,
    required : true
  },
  name: {
    type:String,
    required true
  },
    price: {
      type : Number,
      required : true
    },
  image : {
    type:String,
    required: true
  },
  quantity : {
    type : Number,
    required : true
  }
})

export const CartItem = mongoose.model("CartItem", cartItemSchema) 
