import express from 'express';
import { sendmessage } from "../controller/message.controller.js";
import {verification} from"../middleware/auth.js";
import { getmessage } from '../controller/message.controller.js';
import { deletemsg } from '../controller/message.controller.js';
const router = express.Router();

router.post("/send/:id", verification,sendmessage);
router.get("/get/:id",verification,getmessage);
router.post("/delete/:id",deletemsg);
export default router;