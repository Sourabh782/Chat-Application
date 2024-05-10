import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req, res, next)=>{
    const token = req.cookies.jwt;

    if(!token){
        throw new ApiError(301, "unauthorized access")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
        throw new ApiError(401, "invalid token, login again")
    }

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next()
})

export default verifyJWT