import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"

const getUserForSidebar = asyncHandler(async(req, res)=>{
    // const loggedInUser = req.user?._id

    // const allUsers = await User.find({ _id : { $ne: loggedInUser}}).select("-password");

    // if(!allUsers){
    //     throw new ApiError(500, "something went wrong while fetching users")
    // }

    // console.log(allUsers);

    // return res.status(200).json(
    //     new ApiResponse(200, allUsers, "all users fetched")
    // )

    const data = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "chats",
                localField: "_id",
                foreignField: "sender",
                as: "chats",

                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "receiver",
                            foreignField: "_id",
                            as: "info"
                        }
                    },
                    {
                        $project: {
                            info : 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                chats: 1
            }
        }
    ])
    const data2 = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "chats",
                localField: "_id",
                foreignField: "receiver",
                as: "chats",

                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "sender",
                            foreignField: "_id",
                            as: "info"
                        }
                    },
                    {
                        $project: {
                            info : 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                chats: 1
            }
        }
    ])

    // console.log(data)

    
    let info = []
    
    if(data[0]?.chats[0]?.info){
        info.push(data[0]?.chats[0]?.info);
    }
    if(data2[0]?.chats[0]?.info){
        info.push(data2[0]?.chats[0]?.info);
    }
    
    if(!info){
        info = []
    }
    // console.log(info[0]);

    return res.status(200).json(
        new ApiResponse(200, info[0], "chat list fetched")
    )
})

const searchUser = asyncHandler(async(req, res)=>{
    const { name } = req.body;

    const users = await User.find({
        $and: [
            {fullname: { $regex: name}},
            { _id : { $ne: req.user._id}}
        ]
    }).select("-password")

    if(!users){
        throw new ApiError(404, "no user found")
    }

    // console.log(users);

    return res.status(200).json(
        new ApiResponse(200, users, "users searched")
    )
})

export {
    getUserForSidebar,
    searchUser
}