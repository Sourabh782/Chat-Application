import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

const __dirName = path.resolve()

dotenv.config()

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

app.use(express.json()); // allows to extract req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes)

app.use(express.static(path.join(__dirName, "/frontend/dist")))

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirName, "frontend", "dist", "index.html"))
})

server.listen(PORT, ()=>{
    connectToMongoDb();
    console.log(`Server is running ${PORT}`);
})