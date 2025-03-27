import express from"express";
import { sendotp } from "../controller/otp.controller.js";
import { verifyotp } from "../controller/otp.controller.js";
const router=express.Router();
router.post("/send-otp",sendotp);
router.post("/verify-otp",verifyotp);
export default router;