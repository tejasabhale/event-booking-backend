import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/verify-otp", verifyOtp);

export default router;
