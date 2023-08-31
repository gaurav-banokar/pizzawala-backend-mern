import express from "express";
import {

  createOrder,
  createOrderOnline,
  createPaymentIntent,
  getMyOrders,
  getOrderDetails,
  getStripeAPiKey,

} from "../controllers/order.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createorder",  createOrder);    // add isAuthenticated middleware


router.get("/myOrders", getMyOrders);// add isAuthenticated middleware

router.get("/myOrders/order", getOrderDetails);


router.post("/create-payment-intent",createPaymentIntent)
router.get("/stripeApiKey",getStripeAPiKey)

router.post("/createOrderOnline",createOrderOnline) // add isAuthenticated middleware




export default router;
