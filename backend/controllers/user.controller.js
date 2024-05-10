import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"

const getUserForSidebar = asyncHandler(async(req, res)=>{
    const loggedInUser = req.user?._id

    const allUsers = await User.find({ _id : { $ne: loggedInUser}}).select("-password");

    if(!allUsers){
        throw new ApiError(500, "something went wrong while fetching users")
    }

    return res.status(200).json(
        new ApiResponse(200, allUsers, "all users fetched")
    )
})

export {
    getUserForSidebar
}