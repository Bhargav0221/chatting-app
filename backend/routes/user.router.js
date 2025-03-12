import express from"express"
import {signup} from"../controller/user.controller.js";
import{login,logout} from"../controller/user.controller.js";
import{getuser} from"../controller/user.controller.js";
import { verification } from "../middleware/auth.js";
import { verifiedied } from "../controller/user.controller.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/getuser",verification,getuser);
router.get("/protected",verifiedied);

export default router;