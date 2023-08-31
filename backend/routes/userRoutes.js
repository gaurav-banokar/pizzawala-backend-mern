import express from "express";
import passport from "passport";
import {
  createContactData,
  logout,
  myProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google"),

  (req, res) => {

    res.redirect(process.env.FRONTEND_URL)
  }


);

router.get("/me", isAuthenticated, myProfile);
router.post("/contact", isAuthenticated, createContactData)

router.get("/logout", logout);





export default router;
