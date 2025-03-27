import express from"express";
import { sendotp } from "../controller/otp.controller";
import { verifyotp } from "../controller/otp.controller";
const router=express.Router();
router.post("/send-otp",sendotp);
router.get("/verify-otp",verifyotp);