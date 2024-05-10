import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send/:id", 
verifyJWT,
sendMessage)

export default router;