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

router.post("/createorder",isAuthenticated,  createOrder);    // add isAuthenticated middleware


router.get("/myOrders",isAuthenticated, getMyOrders);// add isAuthenticated middleware

router.get("/myOrders/order",isAuthenticated, getOrderDetails);


router.post("/create-payment-intent",createPaymentIntent)
router.get("/stripeApiKey",getStripeAPiKey)

router.post("/createOrderOnline",isAuthenticated,createOrderOnline) // add isAuthenticated middleware




export default router;
