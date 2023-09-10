import express from "express";
import passport from "passport";
import {
  createContactData,
  getProfilePhoto,
  logout,
  myProfile,
  uploadProfileImage,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

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
router.get("/profile-photo",isAuthenticated,getProfilePhoto)
router.post("/upload-profile-photo",isAuthenticated,singleUpload, uploadProfileImage)
router.post("/contact", isAuthenticated, createContactData)

router.get("/logout",isAuthenticated, logout);





export default router;
