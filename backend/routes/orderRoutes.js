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

router.post("/createorder", isAuthenticated, createOrder);


router.get("/myOrders", isAuthenticated, getMyOrders);

router.get("/myOrders/order/:id", getOrderDetails);


router.post("/create-payment-intent",createPaymentIntent)
router.get("/stripeApiKey",getStripeAPiKey)

router.post("/createOrderOnline",isAuthenticated,createOrderOnline)




export default router;
