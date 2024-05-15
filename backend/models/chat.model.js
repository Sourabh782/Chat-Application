import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
    
})

export const Chat = mongoose.model("Chat", ChatSchema);