import express from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/login", loginUser)
router.post("/signup", signupUser)
router.post("/logout", logoutUser)

export default router