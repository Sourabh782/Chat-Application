import express from "express"
import verifyJWT from "../middleware/auth.middleware.js";
import { getUserForSidebar, searchUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",
    verifyJWT,
    getUserForSidebar
)

router.post("/search",
    verifyJWT,
    searchUser
)

export default router