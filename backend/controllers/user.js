import { request } from "express";
import { asyncError } from "../middlewares/errorMiddleware.js";

import { Order } from "../models/Order.js";
import { Contact } from "../models/Contact.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const myProfile = asyncError(
  async(req, res, next) => {
     
    res.status(200).json({
      success: true,
      user:req.user
    })
  }
)




export const logout = asyncError( (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid", {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    });
    res.status(200).json({
      message: "Logged Out",
    });
  });
})


export const createContactData = asyncError( async(req,res,next) => {
  const { name , email, message} = req.body;
 

  if(!name && !email && !message) {
    return new ErrorHandler("Data provided is undefined",404);
  }

  
  await Contact.create({name,email,message})

  res.status(200).json({
    success:true,
    message:"Message send successfully"
  })

})




