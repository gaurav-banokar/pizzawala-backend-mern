

import app from "./app.js";
import { connectDB } from "./config/database.js";
import Stripe from "stripe";    // stripe importation
import cloudinary from "cloudinary";


// Database
connectDB();

export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})


app.listen(process.env.PORT, (req, res) => {

    console.log(`server is working on port : ${process.env.PORT}`);
})

