import express from "express"
import verifyJWT from "../middleware/auth.middleware.js";
import { getUserForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",
    verifyJWT,
    getUserForSidebar
)

export default router