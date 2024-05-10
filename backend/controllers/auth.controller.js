import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res)=>{
    const { username, password } = req.body;

    if(username === "" || password === ""){
        throw new ApiError(400, "both username and password is required")
    }

    const user = await User.findOne({username})

    if(!user){
        throw new ApiError(404, "user not found");
    }

    const correctPassword = await bcryptjs.compare(password, user?.password)

    if(!correctPassword){
        throw new ApiError(404, "invalid credentials")
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json(
        new ApiResponse(200, user._id, "logged in successfully")
    )
})

const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie("jwt", "", {maxAge: 0})

    return res.status(200).json(
        new ApiResponse(200, [], "loggedout successfully")
    )
})

const signupUser = asyncHandler( async (req, res)=>{
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if(password === ""){
        throw new ApiError(400, "password is required")
    }

    if(password !== confirmPassword){
        throw new ApiError(400, "password and confirm password must be correct")
    }

    const user = await User.findOne({username});

    if(user){
        throw new ApiError(400, "user already exist");
    }

    // hashPassword
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = await User.create({
        fullname,
        username,
        password: hashPassword,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        gender
    })

    const createdUser = await User.findById(newUser._id).select("-password")

    if(!createdUser){
        throw new ApiError(500, "something went wrong while signing up new user")
    }

    generateTokenAndSetCookie(createdUser._id, res);
    
    return res.status(201).json(
        new ApiResponse(201, createdUser, "user created successfully")
    )
})

export {
    loginUser,
    logoutUser,
    signupUser
}