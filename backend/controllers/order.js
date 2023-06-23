import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/Order.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Stripe from "stripe";


export const createOrder = asyncError(async (req, res, next) => { 
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user
  } = req.body;




  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully via Cash On Delivery",
  });
});


export const createOrderOnline = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
    payment_id
  } = req.body;




  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
    payment_id
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order created successfully"
  });
});



export const createPaymentIntent = asyncError(async (req, res, next) => {

  const stripe = new Stripe(process.env.STRIPE_API_SECRET);


  const { total } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(total) * 100,
    currency: "inr"
  })

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  })

});

export const getStripeAPiKey = asyncError(async (req, res, next) => {

  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY,
  })
})

export const getMyOrders = asyncError(async (req, res, next) => {
  const { user } = req.body;
  console.log(id)
  const orders = await Order.find({user}).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");
  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});





