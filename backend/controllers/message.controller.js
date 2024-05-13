import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"

const sendMessage = asyncHandler(async(req, res)=>{
    const { message } = req.body;
    const { id : receiverId } = req.params;
    const senderId = req.user?._id

    if(message === ""){
        throw new ApiError(400, "message is required")
    }

    let conversation = await Conversation.findOne({
        particiants: {
            $all: [senderId, receiverId]
        }
    })

    if(!conversation){
        conversation = await Conversation.create({
            particiants: [senderId, receiverId]
        })
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })

    if(!newMessage){
        throw new ApiError(500, "something went wrong while sending messsage")
    }

    const updated = await Conversation.findByIdAndUpdate(conversation._id, {
        $addToSet: {
            messages: newMessage
        }
    })

    // socket io goes here

    if(!updated){
        throw new ApiError(500, "something went wrong while sending message")
    }
    
    return res.status(200).json(
        new ApiResponse(200, newMessage, "message sent")
    )
})

const getMessage = asyncHandler(async (req, res)=>{
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if(!receiverId || receiverId === ""){
        throw new ApiError(404, "receiver Id not found");
    }

    const conversation = await Conversation.findOne({
        particiants: {
            $all: [senderId, receiverId]
        }
    }).populate("messages") // or can use pipeline

    if(!conversation){
        return res.status(200).json(
            new ApiResponse(200, [], "message found")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, conversation.messages, "messages fetched")
    )
})

export {
    sendMessage,
    getMessage
}