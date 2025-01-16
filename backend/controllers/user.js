import { asyncError } from "../middlewares/errorMiddleware.js";
import cloudinary from "cloudinary";
import { Contact } from "../models/Contact.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import { User } from "../models/User.js";

export const myProfile = asyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const uploadProfileImage = asyncError(async (req, res, next) => {
  const { user } = req.body;

  console.log(req.body);
  const file = req.file;
  const uri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(uri.content, {
    folder: "profile",
  });

  await User.updateOne(
    { _id: user },
    {
      $set: {
        profilePhoto: {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        },
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "Profile Photo Uploaded Successfully",
  });
});

export const getProfilePhoto = asyncError(async (req,res,next) => {
  const userId = req.query.user;
  if(!userId) {
    return next(new ErrorHandler("Not Found Profile",404))
  }
  const user = await User.findOne({ _id: userId });
  const image = user.profilePhoto;

  res.status(200).json({
    success: true,
    image,
  });
});

export const logout = asyncError((req, res, next) => {
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
});

export const createContactData = asyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  console.log(name, email);

  if (!name && !email && !message) {
    return next(new ErrorHandler("Data provided is undefined", 404));
  }

  await Contact.create({ name, email, message });

  res.status(200).json({
    success: true,
    message: "Message send successfully",
  });
});
