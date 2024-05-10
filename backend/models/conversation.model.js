import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    particiants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }]
}, {timestamps: true})

export const Conversation = mongoose.model("Conversation", conversationSchema)